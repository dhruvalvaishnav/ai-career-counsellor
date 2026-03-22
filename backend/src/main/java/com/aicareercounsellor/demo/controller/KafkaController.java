package com.aicareercounsellor.demo.controller;


import com.aicareercounsellor.demo.model.AptitudeTestResult;
import com.aicareercounsellor.demo.service.KafkaProducerService;
import com.aicareercounsellor.demo.service.KafkaProducerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kafka/v1")
public class KafkaController {

    private final KafkaProducerService kafkaProducerService;

    public KafkaController(KafkaProducerService kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;
    }

    @PostMapping("/submit-test")
    public String submitTestResult(@RequestBody AptitudeTestResult testResult) {
        kafkaProducerService.sendTestResult("test-topic", testResult);
        return "Test result submitted successfully!";
    }

}
