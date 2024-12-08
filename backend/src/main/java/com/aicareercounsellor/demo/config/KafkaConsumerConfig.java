package com.aicareercounsellor.demo.config;

import com.aicareercounsellor.demo.model.AptitudeTestResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.KafkaListener;

@Configuration
public class KafkaConsumerConfig {

    @KafkaListener(topics = "test-topic", groupId = "career-counsellor-group")
    public void processTestResult(String message) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Deserialize the JSON message into an AptitudeTestResult object
            AptitudeTestResult testResult = objectMapper.readValue(message, AptitudeTestResult.class);
            System.out.println("Processing Test Result: " + testResult);

            // Simulate AI-based career suggestion logic
            String careerSuggestion = suggestCareer(testResult);
            System.out.println("Suggested Career: " + careerSuggestion);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String suggestCareer(AptitudeTestResult testResult) {
        if (testResult.getLogicalReasoningScore() > 80) {
            return "Software Engineer";
        } else if (testResult.getVerbalReasoningScore() > 80) {
            return "Content Writer";
        } else if (testResult.getQuantitativeScore() > 80) {
            return "Data Scientist";
        } else {
            return "Generalist";
        }
    }
}
