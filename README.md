# Github Badge Service
![](https://badges.creative-minds.studio/Vishal-Pattar/badges/views?color=F9F6EE)
![](https://badges.creative-minds.studio/Vishal-Pattar/badges/clones?color=F9F6EE)
![](https://badges.creative-minds.studio/Vishal-Pattar/badges/commits?color=FF671F)
![](https://badges.creative-minds.studio/Vishal-Pattar/badges/downloads?color=046A39)
![](https://badges.creative-minds.studio/Vishal-Pattar/badges/forks?color=F9F6EE)

This service provides dynamically generated SVG badges for various GitHub repository metrics. It fetches data from the GitHub API and returns the corresponding badge as an SVG file.

## Available Metrics

The following metrics can be generated for any GitHub repository:

- Views
- Clones
- Forks
- Downloads
- Commits

## Usage

To use this service, you need to make a GET request to the appropriate endpoint with the owner, repo, and metric as path parameters. You can optionally specify a color for the badge.

### Endpoints

```
GET /:owner/:repo
```
```
GET /:owner/:repo/:metric
```

- `owner`: GitHub username or organization name
- `repo`: Repository name
- `metric`: One of `views`, `clones`, `forks`, `downloads`, or `commits`

### Query Parameters

- `color` (optional): Color of the badge (default is `blue`)

### Example

To get a badge for the number of views of the `my-repo` repository owned by `my-user`, you can use the following URL:

```
https://badges.creative-minds.studio/:owner/:repo?color=:color
```
```
https://badges.creative-minds.studio/:owner/:repo/:metric?color=:color
```

Replace `:owner`, `:repo`, and `:metric` with the appropriate values. For example:

```
https://badges.creative-minds.studio/my-user/my-repo?color=green
```
```
https://badges.creative-minds.studio/my-user/my-repo/views?color=green
```

### Sample Badges

- **All**: `![All](https://badges.creative-minds.studio/my-user/my-repo?color=blue)`
- **Views**: `![Views](https://badges.creative-minds.studio/my-user/my-repo/views?color=blue)`
- **Clones**: `![Clones](https://badges.creative-minds.studio/my-user/my-repo/clones?color=blue)`
- **Forks**: `![Forks](https://badges.creative-minds.studio/my-user/my-repo/forks?color=blue)`
- **Downloads**: `![Downloads](https://badges.creative-minds.studio/my-user/my-repo/downloads?color=blue)`
- **Commits**: `![Commits](https://badges.creative-minds.studio/my-user/my-repo/commits?color=blue)`

### Response

The service will return an SVG image of the badge.

### Error Handling

If an invalid metric is requested, the service will return a `400 Bad Request` response with an error message.

If there is an error fetching data from the GitHub API, the service will return a `500 Internal Server Error` response with an error message.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
