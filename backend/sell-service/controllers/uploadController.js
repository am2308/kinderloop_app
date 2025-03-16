const AWS = require('aws-sdk');
// Configure AWS SDK to use Signature Version 4
/*
const sts = new AWS.STS();
async function assumeRole() {
  const params = {
    RoleArn: 'arn:aws:iam::637423357784:role/kinderloop',
    RoleSessionName: 'BackendServiceSession',
  };

  try {
    const data = await sts.assumeRole(params).promise();
    AWS.config.update({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
      region: 'ap-south-1',
    });
    console.log('Assumed Role Credentials:', AWS.config.credentials);
  } catch (err) {
    console.error('Error assuming role:', err);
  }
}
assumeRole();
*/
AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    //signatureVersion: 'v4', // Use AWS4-HMAC-SHA256
    //accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-south-1', // Ensure you have the correct region in your .env
});
s3 = new AWS.S3();

exports.getPresignedUrl = async (req, res) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: 'fileName and fileType are required' });
  }
  // Sanitize the file name to ensure proper URL encoding
  const sanitizedFileName = encodeURIComponent(fileName);
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}__${sanitizedFileName}`, // Unique file name
    ContentType: fileType,
    ACL: 'public-read', // Make the file publicly accessible
    Expires: 7200, // URL will expire in 1 hour (3600 seconds)
  };
  console.log("Params:", params);
  try {
    const presignedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
    
    res.json({ presignedUrl, fileUrl, expiresIn: params.Expires });
  } catch (err) {
    console.error('Error generating pre-signed URL:', err);
    res.status(500).json({ error: 'Failed to generate pre-signed URL' });
  }
};