import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    

    const emailServer = process.env.EMAIL_SERVER;
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    
    if (!emailServer || !emailUser || !emailPassword) {
      console.error('Email configuration is missing. Please check your .env.local file');
      return NextResponse.json(
        {
          success: false,
          message: 'Email server not configured',
          error: 'Missing email configuration'
        },
        { status: 500 }
      );
    }
    
 
    const transporter = nodemailer.createTransport({
      host: emailServer,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });


    const fromEmail = process.env.EMAIL_FROM || emailUser;
    

    const toEmail = process.env.EMAIL_TO || emailUser;
    
    // 1. Send the ContactForm to Admin
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email} (You can reply directly to this message)
        
        Message: 
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    
    // 2. Send thank you email to the sender 
    await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: `Thank you for contacting Us!`,
      text: `
        Dear ${name},

        We've received your message and will reply as soon as possible.

        Here's your message:
        
        "${message}"

         We appreciate your interest and look forward to connecting with you.
        
        Best regards,
        Together, we decide
        © ${new Date().getFullYear()} Amira Bayoumi. All rights reserved.
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Us</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #444444; 
              margin: 0; 
              padding: 0; 
              background-color: #e6e8e6; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(201, 202, 126, 0.79);
            }
            .header { 
              background-color: black; 
              color: white; 
              padding: 20px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
              text-align: center;
            }
            .content { 
              padding: 20px; 
              color: #444444;
            }
            .message-box { 
              background-color: #f1f5f9; 
              border-left: 4px solid #160c28; 
              padding: 15px; 
              margin: 20px 0; 
              border-radius: 4px;
              color: #efcb68
            }
            .footer { 
              text-align: center; 
              margin-top: 30px; 
              padding-top: 20px;
              border-top: 1px solid #d9dcd6;
              color: #444444;
              font-size: 14px;
            }
            .button {
              display: inline-block;
             
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 4px;
              margin-top: 20px;
              font-weight: bold; background-color: #160c28;
              color: #efcb68;
            }
            .button:hover { background-color: #efcb68;
              color: #160c28;
             

            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">Thank You for your Message!</h2>
            </div>
            <div class="content">
              <p style="color: #444444;">Dear ${name.toUpperCase()},</p>
              
              <p style="color: #444444;"> we have received your message and will reply as soon as possible.
</p>
              
              <div class="message-box">
                <p style="margin: 0; color: #444444;"><strong>Your message:</strong></p>
                <p style="margin: 10px 0 0; font-style: italic; color: #444444;">${message}</p>
              </div>

              <p style="color: #444444;"> our community will be happy to connect with you.</p>

              <div class="footer">
                <p style="color: #444444;">Best regards,<br><strong> Together, we decide </strong></p>
                <p style="color: #444444;">© ${new Date().getFullYear()}  Amira Bayoumi. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email',
        error: (error as Error).message
      },
      { status: 500 }
    );
  }
}
