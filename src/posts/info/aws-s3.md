# Deploying to AWS S3 (Vue3 + Quasar + pnpm)

We will proceed with the deployment to AWS (Amazon Web Services) Simple Storage Service (S3), a highly scalable and economical cloud storage service.

By building your projects on AWS S3, you can take advantage of the scalability, reliability, and cost-effectiveness of the AWS Cloud.

AWS S3 also makes it easy to serve static websites, simplifying the deployment process and reducing infrastructure complexity.

If you don't have an AWS account, please create one.
We will be using github actions, so please upload your project to the github repository.

1. Log in to your <a href="https://ap-northeast-2.console.aws.amazon.com/console/home">AWS</a> account.

2. Go to the S3 Dashboard and click the Create Bucket button.

3. Enter the bucket name and `AWS Region` as `Asia Pacific (Seoul) ap-northeast-2`.

4. For object ownership, click `Enable ACL`.

5. Release all public access blocks and click the Create Bucket button.

6. After clicking on the bucket you created, click on the properties tab.

7. Press the Edit button of `Static Website Hosting` at the bottom of the Properties tab to `Enable` it.

8. If you implemented `index.html` for the index document and an error page for the error document, you do not need to enter the corresponding page or index.html or anything else. Save your changes.

9. Go to the Permissions tab and click the 'Edit Bucket Policy' button to paste the text below.

```json
// Bucket policy to allow public access
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nextbit/*"
    }
  ]
}
```

You can manually upload the project build folder, but let's do an automatic deployment using github actions.

First, get `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from <a href="http://us-east-1.console.aws.amazon.com/iamv2/home" target="_blank">IAM</a>. It is.

1. In IAM, click Manage Access => Users => Add User button.

2. Enter the user name and click Next.

3. Change the Permissions option to Direct Policy Attachment, search for `AmazonS3FullAccess`, check it, click Next, and click the Create User button.

4. Click on the created user to enter and click on `Create Access Key` on the `Security Credentials` tab.

5. Select `Local Code` as the use case and press `Create Access Key`.

6. Download the `.csv file` and save the access key and `secret access key (secret key)` well.

7. Click the `Settings` tab in the Github repository.

8. Click Security => Secrets and variables => Actions and click New repository secret.

9. Name: `AWS_ACCESS_KEY_ID`, Secret: Enter the issued `Access Key` and create it.

10. Name: `AWS_SECRET_ACCESS_KEY` , Secret: Enter the issued `Secret Access Key (Secret Key)` and create it.

11. Click the `Actions` tab in the github repository.

12. Press the `New workflow` button.

13. Press `set up a workflow yourself`.

14. Name the yml file freely.

15. Enter the code below.

```yml
name: Vue Build and Deploy to S3

on:
  push:
    branches: main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - uses: pnpm/action-setup@v2
        name: Install pnpm
        id: pnpm-install
        with:
          version: 8
          run_install: false

      - name: Install dependencies
        run: pnpm add @quasar/cli -g && pnpm install

      - name: Build
        run: pnpm run build:pwa

      - uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: <Bucket_Name>
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ap-northeast-2
          SOURCE_DIR: "dist/pwa"
```

Enter the name of your S3 bucket in `<Bucket_Name>`.

If you followed the process of the posting well, it will be automatically deployed to AWS S3.
