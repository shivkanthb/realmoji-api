## Realmoji API
Realmoji api returns a matching sticker (from Giphy, previously imoji) for an emoji. Realmoji api is used in apps like [Telimoji](https://telimoji.com).

Original service - [Realmoji](http://www.realmoji.com/) by [@jordansinger](https://github.com/jordansinger) 🙌

### Usage
#### Service Endpoint : https://aarmusk.stdlib.com/realmojiapi

#### parameters

`query` - a valid emoji (eg - 💯) or a phrase(eg - love)

#### Example:
`GET` https://aarmusk.stdlib.com/realmojiapi?query=😎

returns

```
{
status: "SUCCESS",
url: "https://stickers.giphy.com/e63/e632b0af-ff15-42bc-9334-5d87e86b2210/bordered-150.png?691e4c506b5a8b7777537c9f60862d9ds7745b5321ece498b8f69decab6a7d368"
}
```
