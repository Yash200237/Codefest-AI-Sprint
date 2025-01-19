from passlib.context import CryptContext

# Initialize bcrypt context
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# List of passwords
passwords = [
    "password123", "password789", "password102", "password104",
    "password106", "password108", "password109", "password110",
    "password111", "password112"
]

# Generate and print hashed passwords
for password in passwords:
    hashed_password = bcrypt_context.hash(password)
    print(f"Plaintext: {password} -> Hashed: {hashed_password}")
