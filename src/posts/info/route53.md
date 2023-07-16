# AWS route53으로 DNS 연결하기

route53 is DNS provided by AWS.

Let's look at the differences between general DNS and route53 and their characteristics.
First of all, the way DNS works is the process of converting a domain into an IP and communicating with the IP network to find the destination IP.

1. In general, a name server is designated at the time of domain registration, but Route53 must connect the assigned name server to the place where the domain was registered and specify the assigned name server.
2. Route53 has Public Host Zone and Private Host Zone. Public Host Zone operates as a general name server, and Private Host Zone operates only within AWS.
3. You can give ALIAS for the domain itself.
   For dns.com as an example, you could give www.dns.com an ALIAS Target for the domain itself. It is possible to give the same IP response. If you change the IP of www, the IP of dns.com will also change.
4. Monitoring is possible for a specific port. In the Status Check tab, designate the port you want to monitor to enable monitoring.
5. It has a function to perform failover like network equipment such as Netscaler, Foundry, and Piolink. Here, failover refers to a function to prepare for failure. When a system fails, it is operated by replacing it with another system prepared in advance.
6. GSLB (Global Server Load Balancing) provides the ability to distribute load regardless of region. Load Balancing is possible regardless of region or country, not depending on a specific IDC. In detail, it provides three functions: Failover, Act-Act (traffic control), and traffic control by region.

::: info Advantages

Provides a GUI.
The stability of the name server itself is increased. Anycast Network + 4 name servers + safety from ddos ​​=> 100% availability
Global service becomes possible. => Speed ​​can be improved using GSLB.

:::

::: tip

The name of the S3 bucket and the name of the purchased domain must be the same.

:::

1. Go to AWS Route53.
2. To purchase and use a domain from AWS, enter the domain name in `Domain Registration` and purchase the desired domain. Or you can buy it from other hosting sites like Gavia.
3. Go to `Host Area` and click `Create Hosted Area`.
4. Enter the purchased domain name and create a hosted zone.
5. There will be 4 name servers. These will set the name server for the purchased domain. Enter the 1st 2nd 3rd 4th in order and save it.
   The . at the end must be omitted here.
6. Return to route53 again, click `Create Record` and turn on the `Alias` switch.
7. Select `Alias ​​for S3 website endpoint` as the endpoint.
8. Select Asia Pacific Seoul (ap-northeast-2) for region.
   When creating an s3 bucket, select the region you selected.
9. Enter `s3-website.ap-northeast-2.amazonaws.com` in the S3 endpoint input.
10. Wait a bit and go to http://domain.com and you will see the page.
