import unittest
from unittest.mock import MagicMock, patch, PropertyMock

from backend.app.integrations.git.github_integration import GitHubManager
from github import GithubException, BadCredentialsException

# Patching target should be where the object is looked up.
GITHUB_CLASS_PATCH_TARGET = 'backend.app.integrations.git.github_integration.Github'
AUTH_CLASS_PATCH_TARGET = 'backend.app.integrations.git.github_integration.Auth'

class TestGitHubManager(unittest.TestCase):
    """
    Unit tests for the GitHubManager class.
    """

    def test_empty_auth_token_raises_error(self):
        """Tests that an empty auth token raises a ValueError."""
        with self.assertRaises(ValueError):
            GitHubManager(auth_token="")

    @patch(AUTH_CLASS_PATCH_TARGET)
    @patch(GITHUB_CLASS_PATCH_TARGET)
    def test_successful_authentication(self, MockGithub, MockAuth):
        """Tests that the manager authenticates successfully."""
        mock_github_instance = MockGithub.return_value
        mock_user = MagicMock()
        mock_user.login = "testuser"
        mock_github_instance.get_user.return_value = mock_user

        manager = GitHubManager(auth_token="valid_token")
        self.assertIsNotNone(manager._authenticate())
        self.assertEqual(manager._user, mock_user)

    @patch(AUTH_CLASS_PATCH_TARGET)
    @patch(GITHUB_CLASS_PATCH_TARGET)
    def test_failed_authentication_raises_error(self, MockGithub, MockAuth):
        """Tests that failed authentication raises a ConnectionError."""
        mock_github_instance = MockGithub.return_value
        mock_user = MagicMock()
        type(mock_user).login = PropertyMock(side_effect=BadCredentialsException(401, "Bad credentials"))
        mock_github_instance.get_user.return_value = mock_user

        manager = GitHubManager(auth_token="invalid_token")
        with self.assertRaises(ConnectionError):
            manager._authenticate()

    @patch(AUTH_CLASS_PATCH_TARGET)
    @patch(GITHUB_CLASS_PATCH_TARGET)
    def test_get_user_projects_successfully(self, MockGithub, MockAuth):
        """Tests fetching user projects successfully."""
        mock_github_instance = MockGithub.return_value
        mock_project = MagicMock()
        mock_project.id, mock_project.name, mock_project.creator.login = 1, "Test Project", "testuser"

        mock_authenticated_user = MagicMock()
        mock_authenticated_user.login = 'testuser'
        mock_authenticated_user.get_projects.return_value = [mock_project]

        mock_github_instance.get_user.return_value = mock_authenticated_user

        manager = GitHubManager(auth_token="valid_token")
        projects = manager.get_projects()

        self.assertEqual(len(projects), 1)
        self.assertEqual(projects[0]['name'], "Test Project")
        mock_github_instance.get_user.assert_called_once_with()

    @patch(AUTH_CLASS_PATCH_TARGET)
    @patch(GITHUB_CLASS_PATCH_TARGET)
    def test_get_organization_projects_successfully(self, MockGithub, MockAuth):
        """Tests fetching organization projects successfully."""
        mock_github_instance = MockGithub.return_value
        mock_user = MagicMock()
        mock_user.login = 'testuser'
        mock_github_instance.get_user.return_value = mock_user

        mock_project = MagicMock()
        mock_project.id, mock_project.name, mock_project.creator.login = 1, "Org Project", "orguser"

        mock_org = MagicMock()
        mock_org.get_projects.return_value = [mock_project]
        mock_github_instance.get_organization.return_value = mock_org

        manager = GitHubManager(auth_token="valid_token")
        projects = manager.get_projects(org_name="testorg")

        self.assertEqual(len(projects), 1)
        self.assertEqual(projects[0]['name'], "Org Project")
        mock_github_instance.get_organization.assert_called_once_with("testorg")

if __name__ == "__main__":
    unittest.main()
