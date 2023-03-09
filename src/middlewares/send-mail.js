require('dotenv').config()

const nodemailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library')

const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN
const ADMIN_EMAIL_ADDRESS = process.env.MAIL_USER

// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET,
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
})
// Tạo API /email/send với method POST
const sendMail = async (req, res, next) => {
    try {
        /**
         * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
         * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
         */
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
        const myAccessToken = myAccessTokenObject?.token

        // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccessToken,
            },
        })

        const content = `
            <div>
                <h1>Nhấn vào liên kết bên dưới để xác thực tài khoản</h1>
                <h3>
                    <a href="http://localhost:7000/api/auth/register/verify/${req.user.confirmationCode}">
                        link xác thực
                    </a>
                </h3>
            </div>
        `

        // mailOption là những thông tin gửi từ phía client lên thông qua API
        const mailOptions = {
            to: req.user.email, // Gửi đến ai?
            subject: `Admin Store Online xin gửi đường dẫn xác thực tài khoản ${req.user.account}`, // Tiêu đề email
            html: content, // Nội dung email
        }
        // Gọi hành động gửi email
        await transport.sendMail(mailOptions)
        // Không có lỗi gì thì trả về success
        console.log('Sent mail successfully')
        // res.status(200).json(display({
        //     message: 'Gửi email thành công'
        // }))
    } catch (error) {
        console.log(`Sent mail error: ${error}`)
        next(error)
    }
}

module.exports = sendMail
