package com.aicareercounsellor.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class GroqService {

    @Value("${AI_Career_Counselling_API_Key}")
    private String apiKey;

    @Value("${groq.api.url:https://api.groq.com/openai/v1/chat/completions}")
    private String apiUrl;

    @Value("${groq.model:llama-3.3-70b-versatile}")
    private String model;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getCareerRecommendation(String prompt) {
        try {
            // System message
            Map<String, String> systemMsg = new HashMap<>();
            systemMsg.put("role", "system");
            systemMsg.put("content",
                    "You are an expert career counsellor helping students discover their ideal career paths. " +
                            "Provide structured, encouraging, and practical career advice based on aptitude test scores. " +
                            "Always give 3 ranked career suggestions with brief reasoning for each."
            );

            // User message
            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", prompt);

            // Full request body
            Map<String, Object> requestBodyMap = new HashMap<>();
            requestBodyMap.put("model", model);
            requestBodyMap.put("messages", new Object[]{systemMsg, userMsg});
            requestBodyMap.put("max_tokens", 500);
            requestBodyMap.put("temperature", 0.7);

            String requestBody = objectMapper.writeValueAsString(requestBodyMap);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode jsonResponse = objectMapper.readTree(response.body());
                return jsonResponse
                        .path("choices")
                        .get(0)
                        .path("message")
                        .path("content")
                        .asText();
            } else {
                System.err.println("Groq API error: " + response.statusCode() + " - " + response.body());
                return "Unable to generate career recommendation at this time. Please try again later.";
            }

        } catch (Exception e) {
            System.err.println("Error calling Groq API: " + e.getMessage());
            return "Error generating recommendation: " + e.getMessage();
        }
    }
}