import os
from github import Github, Auth
from github.GithubException import GithubException, BadCredentialsException

class GitHubManager:
    """
    Manages the connection and operations with the GitHub API for projects.
    """

    def __init__(self, auth_token: str):
        """
        Initializes the GitHub manager with a personal access token.
        """
        if not auth_token:
            raise ValueError("Authentication token cannot be empty.")
        auth = Auth.Token(auth_token)
        self._github = Github(auth=auth)
        self._user = None

    def _authenticate(self):
        """
        Authenticates the user and caches the user object.
        """
        if self._user is None:
            try:
                self._user = self._github.get_user()
                # Eagerly access a property to trigger authentication
                _ = self._user.login
            except BadCredentialsException as e:
                raise ConnectionError("Authentication failed: Invalid GitHub token.") from e
            except GithubException as e:
                raise ConnectionError(f"An error occurred with the GitHub API: {e.data.get('message', 'Unknown error')}") from e
        return self._user

    def get_projects(self, org_name: str = None):
        """
        Fetches projects for the authenticated user or a specified organization.

        :param org_name: (Optional) The name of the organization. If None, fetches user projects.
        :return: A list of project data dictionaries.
        """
        authenticated_user = self._authenticate()
        try:
            if org_name:
                entity = self._github.get_organization(org_name)
                source = "organization"
            else:
                # get_projects() is on NamedUser, not AuthenticatedUser
                entity = self._github.get_user(authenticated_user.login)
                source = "user"

            projects = entity.get_projects()
            return [self._transform_project(p) for p in projects]
        except GithubException as e:
            if e.status == 404:
                # This will now correctly use the login name for the user
                entity_name = org_name or authenticated_user.login
                print(f"Error: {source.capitalize()} '{entity_name}' not found.")
                return []
            raise

    def _transform_project(self, project) -> dict:
        """
        Transforms a PyGithub Project object into a simplified dictionary.
        """
        return {
            "id": project.id,
            "name": project.name,
            "body": project.body,
            "state": project.state,
            "url": project.html_url,
            "creator": project.creator.login
        }

def main():
    """ Main function for demonstration. """
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        print("Error: GITHUB_TOKEN environment variable is not set.")
        return

    try:
        manager = GitHubManager(auth_token=token)

        # Get user projects
        print("Fetching your projects...")
        user_projects = manager.get_projects()
        if user_projects:
            print("Found user projects:")
            for p in user_projects:
                print(f"  - {p['name']} (State: {p['state']})")
        else:
            print("No user projects found.")

        # Get organization projects (replace with a real org name)
        org_name = "PyGithub" # A public org for testing
        print(f"\nFetching projects for organization '{org_name}'...")
        org_projects = manager.get_projects(org_name=org_name)
        if org_projects:
            print(f"Found projects in {org_name}:")
            for p in org_projects:
                print(f"  - {p['name']} (State: {p['state']})")
        else:
            print(f"No projects found in {org_name}.")

    except (ValueError, ConnectionError) as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
