from django.core.management.utils import get_random_secret_key

# Generate a new secret key
new_secret_key = get_random_secret_key()

print(f"Your new Django SECRET_KEY is: {new_secret_key}")

# Example of how to use in settings.py:
print("\nIn your Django settings.py, you can use it like this:")
print("SECRET_KEY = '" + new_secret_key + "'")

# If you want to save it to a .env file:
print("\nTo save to a .env file, you can use:")
print("import os")
print("os.environ['DJANGO_SECRET_KEY'] = '" + new_secret_key + "'")
print("\nThen in your settings.py:")
print("SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')")