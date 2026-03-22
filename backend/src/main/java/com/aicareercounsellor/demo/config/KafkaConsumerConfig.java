package com.aicareercounsellor.demo.config;

import com.aicareercounsellor.demo.model.AptitudeTestResult;
import com.aicareercounsellor.demo.model.CareerRecommendation;
import com.aicareercounsellor.demo.service.CareerRecommendationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.KafkaListener;

@Configuration
public class KafkaConsumerConfig {

    private final CareerRecommendationService careerRecommendationService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Constructor injection (best practice)
    public KafkaConsumerConfig(CareerRecommendationService careerRecommendationService) {
        this.careerRecommendationService = careerRecommendationService;
    }

    @KafkaListener(topics = "test-topic", groupId = "career-counsellor-group")
    public void processTestResult(String message) {
        try {
            System.out.println("📥 Received aptitude test from Kafka: " + message);

            // Deserialize JSON → AptitudeTestResult
            AptitudeTestResult testResult = objectMapper.readValue(message, AptitudeTestResult.class);
            System.out.println("✅ Parsed test result for user: " + testResult.getUserId());

            // Call AI for career recommendation
            System.out.println("🤖 Calling Groq AI for career recommendation...");
            CareerRecommendation recommendation = careerRecommendationService.generateRecommendation(testResult);

            // Log the result (later: save to DB or send to frontend via WebSocket)
            System.out.println("🎯 Career Recommendation for " + recommendation.getUserId() + ":");
            System.out.println(recommendation.getAiRecommendation());

        } catch (Exception e) {
            System.err.println("❌ Error processing test result: " + e.getMessage());
            e.printStackTrace();
        }
    }
}