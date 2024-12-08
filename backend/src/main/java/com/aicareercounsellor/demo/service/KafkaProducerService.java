package com.aicareercounsellor.demo.service;

import com.aicareercounsellor.demo.model.AptitudeTestResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public KafkaProducerService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = new ObjectMapper();
    }

    public void sendTestResult(String topic, AptitudeTestResult testResult) {
        try {
            String message = objectMapper.writeValueAsString(testResult);
            kafkaTemplate.send(topic, message);
            System.out.println("Test result sent: " + message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
