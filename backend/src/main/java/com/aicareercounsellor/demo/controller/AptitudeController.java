package com.aicareercounsellor.demo.controller;

import com.aicareercounsellor.demo.model.AptitudeTestResult;
import com.aicareercounsellor.demo.model.CareerRecommendation;
import com.aicareercounsellor.demo.service.CareerRecommendationService;
import com.aicareercounsellor.demo.service.KafkaProducerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aptitude")
@CrossOrigin(origins = "*") // allows React frontend to call this API
public class AptitudeController {

    private final KafkaProducerService kafkaProducerService;
    private final CareerRecommendationService careerRecommendationService;

    public AptitudeController(KafkaProducerService kafkaProducerService,
                              CareerRecommendationService careerRecommendationService) {
        this.kafkaProducerService = kafkaProducerService;
        this.careerRecommendationService = careerRecommendationService;
    }

    /**
     * React frontend calls this endpoint with aptitude test scores.
     * <p>
     * POST /api/aptitude/submit
     * Body: { "userId": "student123", "logicalReasoningScore": 85, "verbalReasoningScore": 60, "quantitativeScore": 72 }
     * <p>
     * Returns: CareerRecommendation JSON with AI-generated career suggestions
     */
    @PostMapping("/submit")
    public ResponseEntity<CareerRecommendation> submitTest(@RequestBody AptitudeTestResult testResult) {
        // Step 1: Send to Kafka (for async processing / event streaming)
        kafkaProducerService.sendTestResult("test-topic", testResult);

        // Step 2: Also directly get AI recommendation to return to frontend immediately
        CareerRecommendation recommendation = careerRecommendationService.generateRecommendation(testResult);

        return ResponseEntity.ok(recommendation);
    }

    /**
     * Health check endpoint
     * GET /api/aptitude/health
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("AI Career Counsellor API is running!");
    }
}