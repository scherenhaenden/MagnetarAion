import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def send_password_reset_email(email: str, token: str):
    """
    Simulates sending a password reset email.
    In a real application, this function would use a mail client to send an email.
    For this example, we'll just log the email to the console.
    """
    reset_link = f"http://localhost:4200/reset-password?token={token}"
    logger.info("---- PASSWORD RESET EMAIL ----")
    logger.info(f"To: {email}")
    logger.info("Subject: Reset your password")
    logger.info("Body:")
    logger.info("Please use the following link to reset your password:")
    logger.info(reset_link)
    logger.info("-----------------------------")
