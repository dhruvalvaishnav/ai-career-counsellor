curl -X POST http://localhost:8080/api/v1/submit-test
    -H "Content-Type: application/json" \
    -d '{
          "userId":124,
           "logicalReasoningScore":77,
           "verbalReasoningScore":66,
           "quantitativeScore":50
        }'