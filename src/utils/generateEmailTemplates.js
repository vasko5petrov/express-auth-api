export const verifyEmailTemplate = (link) => `
<!DOCTYPE >
<html>
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <style>
        .wrapper {
            max-width: 600px;
            width: 100%;
        }
    </style>
</head>
<body>
    <div>
        <table width="100%" cellspacing="0" cellpadding="10">
            <tbody>
                <tr>
                    <td align="center" valign="top">
                        <table class="wrapper" cellspacing="0" cellpadding="10">
                            <tbody>
                                <tr>
                                    <td align="center" valign="top">
                                        <h1 style="color: #ffffff; line-height: 100%; background: #cc4d29; padding: 20px;">The Nook</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <h2 style="color: #333333; font-family: 'open sans', 'helvetica neue', helvetica, arial, sans-serif;">Your registration is complete!</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <p style="font-size: 16px; color: #777777;">Please follow the link below to verify your email.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a target="_blank" style="padding: 10px 20px; text-decoration: none; font-weight: normal; border-width: 15px 30px; background: #cc4d29 none repeat scroll 0% 0%; border-color: #cc4d29; color: #ffffff; font-size: 18px;" href="${link}">Verify</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
`;