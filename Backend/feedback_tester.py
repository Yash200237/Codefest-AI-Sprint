from transformers import pipeline

# Load sentiment analysis model
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Sentiment classification function
def classify_sentiment(review):
    sentiment = sentiment_analyzer(review)
    return sentiment[0]["label"]  # 'LABEL_0' = negative, 'LABEL_1' = positive

# Test case
test_review = "I love this product, it's amazing and really useful."
classification = classify_sentiment(test_review)
print(classification)
