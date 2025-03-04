const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.getPresignedUrl = async (req, res) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: 'fileName and fileType are required' });
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${fileName}`, // Unique file name
    ContentType: fileType,
    ACL: 'public-read', // Make the file publicly accessible
  };

  try {
    // Generate a pre-signed URL for S3 upload
    const presignedUrl = await s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
    res.json({ presignedUrl, fileUrl });
  } catch (err) {
    console.error('Error generating pre-signed URL:', err);
    res.status(500).json({ error: 'Failed to generate pre-signed URL' });
  }
};