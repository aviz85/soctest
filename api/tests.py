from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Post, Like

class SocialNetworkTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.client.force_authenticate(user=self.user)

    def test_create_post(self):
        data = {'content': 'This is a test post'}
        response = self.client.post('/api/posts/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().content, 'This is a test post')

    def test_list_posts(self):
        Post.objects.create(user=self.user, content='Test post 1')
        Post.objects.create(user=self.user, content='Test post 2')
        response = self.client.get('/api/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_like_post(self):
        post = Post.objects.create(user=self.user, content='Test post')
        response = self.client.post('/api/likes/', {'post': post.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Like.objects.count(), 1)

    def test_unlike_post(self):
        post = Post.objects.create(user=self.user, content='Test post')
        like = Like.objects.create(user=self.user, post=post)
        response = self.client.delete(f'/api/likes/{like.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Like.objects.count(), 0)

    def test_register_user(self):
        data = {'username': 'newuser', 'password': 'newpass123', 'email': 'newuser@test.com'}
        response = self.client.post('/api/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_login_user(self):
        data = {'username': 'testuser', 'password': 'testpass123'}
        response = self.client.post('/api/login/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], 'Successfully logged in.')

    def test_logout_user(self):
        response = self.client.post('/api/logout/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'], 'Successfully logged out.')

    def test_unauthorized_post_creation(self):
        self.client.force_authenticate(user=None)
        data = {'content': 'This should fail'}
        response = self.client.post('/api/posts/', data)