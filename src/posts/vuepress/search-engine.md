# Get exposed in Google search

Create a <a href="https://analytics.google.com/analytics/web/?authuser=0#/provision/SignUp/" target="_blank">Google Analytics</a> account.

In the business details, I set the industry as `Online Community`, business goal as `Lead Generation`, and `User Behavior Review`. You can do it with something else.

If you use a distribution project root or theme, create a `_config.yml` file in the src/public folder and enter the code below.

```yml
# _config.yml
google_analytics: { Tracking ID }
url: { Distribution URL } # https://username.github.io/
```

Click Get started in <a href="https://search.google.com/search-console/about?hl=en&utm_source=wmx&utm_medium=wmx-welcome" target="_blank">Google Search Console</a> .

Select `URL Prefix` and enter `https://username.github.io/`.

Confirm ownership by choosing the recommended verification method or 4 other verification methods.

I will do the recommended verification method. Download the html file and put it in the root.

And if you use the root folder or theme, create a `sitemap.yml` file in the src/public folder and put the code below as it is.

```yml
---
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {% for post in site.posts %}
    <url>
        <loc>{{ site.url }}{{ post.url | remove: 'index.html' }}</loc>
    </url>
    {% endfor %}

    {% for page in site.pages %}
    {% if page.layout != nil %}
    {% if page.layout != 'feed' %}
    <url>
        <loc>{{ site.url }}{{ page.url | remove: 'index.html' }}</loc>
    </url>
    {% endif %}
    {% endif %}
    {% endfor %}
</urlset>
```

::: tip

If you use vuepress, you can use <a href="https://plugin-sitemap2.vuejs.press/" target="_blank">vuepress-plugin-sitemap2</a> to automatically create and manage sitemaps.

:::

After that, google search console => Index creation => Go to `https://username.github.io/sitemap.xml` in `Sitemaps` and submit. After that, check if your blog is showing up well in Google search. It may take some time before exposure.
