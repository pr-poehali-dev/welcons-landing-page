import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event: dict, context) -> dict:
    """
    Принимает данные заявки с сайта ВЕЛКОНС и отправляет письмо на info@wellcons.ru
    """
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {
            "statusCode": 405,
            "headers": cors_headers,
            "body": json.dumps({"error": "Method not allowed"}),
        }

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Invalid JSON"}),
        }

    name = (body.get("name") or "").strip()
    phone = (body.get("phone") or "").strip()
    company = (body.get("company") or "").strip()
    message = (body.get("message") or "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "\u0418\u043c\u044f \u0438 \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b"}, ensure_ascii=False),
        }

    # Настройки SMTP — Яндекс по умолчанию
    smtp_host = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "info@wellcons.ru")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    to_email = os.environ.get("LEAD_EMAIL", "info@wellcons.ru")

    now = datetime.now().strftime("%d.%m.%Y %H:%M")

    # HTML-письмо
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #c9a349, #8b6b1e); padding: 28px 32px;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: bold;">
            🏗 Новая заявка с сайта ВЕЛКОНС
          </h1>
          <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">{now}</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px; width: 35%;">Имя</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 15px; font-weight: 600;">{name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Телефон</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <a href="tel:{phone}" style="color: #c9a349; font-size: 15px; font-weight: 600; text-decoration: none;">{phone}</a>
              </td>
            </tr>
            {"" if not company else f'''
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Компания</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; font-size: 15px;">{company}</td>
            </tr>'''}
            {"" if not message else f'''
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Комментарий</td>
              <td style="padding: 10px 0; color: #1a1a1a; font-size: 15px; line-height: 1.6;">{message}</td>
            </tr>'''}
          </table>
        </div>
        <div style="background: #f9f9f9; padding: 20px 32px; border-top: 1px solid #f0f0f0;">
          <p style="margin: 0; color: #aaa; font-size: 12px;">
            Заявка получена с сайта wellcons.ru · {now}
          </p>
        </div>
      </div>
    </body>
    </html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка СРО: {name} {('| ' + company) if company else ''}"
    msg["From"] = f"ВЕЛКОНС Сайт <{smtp_user}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "message": "Заявка отправлена"}),
    }