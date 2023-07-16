# Using HTTPS with Cloudfront

## First, we will issue an SSL certificate from AWS Certificate Manager (ACM).

1. Go into <a href="https://ap-northeast-2.console.aws.amazon.com/acm/home?region=ap-northeast-2#/welcome" target="_blank" > AWS Certificate Manager (ACM)</a>.
2. Click Request Certificate and select Request Public Certificate.
3. Enter the domain name (purchased domain) and click the Request button at the bottom.

## Now let's set up CloudFront.

1. <a href="https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=ap-northeast-2#/welcome" target="_blank">CloudFront </a> Click the Create CloutFront distribution button.
2. Select the source domain and click Use website endpoint.
3. Select HTTP only for Protocol and enter `{{domain}}.s3-website.ap-northeast-2.amazonaws.com` for Name. No EC2 server or S3 work required for HTTPS.
4. Select Viewer Protocol Policy => `Redirect HTTP to HTTPS` in Default Cache Behavior.
5. Select Web Application Firewall. In my case, I selected Enable and also selected Use Monitor mode.
6. In Settings, select the price category you want. In my case, I selected 'Used in North America, Europe, Asia, Middle East and Africa'.
7. Click Add Alternate Domain Name (CNAME) entry and enter the {domain.com} domain.
8. For 'Custom SSL Certificate', select the certificate issued by ACM.

CloudFront setup is finished.

Now let's go back to Route53 and add another routing record for CloudFront.

1. S3 => Delete the record that allowed http://domain.com to be accessed by Route53.
2. Click Create Record in Route53.
3. Turn on the alias switch and select 'Alias ​​for CloudFront distribution' as the traffic route destination.
4. Click Select Distribution to select a cloudfront domain name and create a record.

::: tips

S3 => Route53 is using http,
S3 => Cloudfront => Route53 is https use.

:::

Now you can check that https://domain.com is entering well.
