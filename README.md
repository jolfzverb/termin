# Termin in Berlin

Я не настоящий сварщик. Скрипт подкинули друзья на просторах интернета, я его подхачил под себя и запустил.

После клонирования запускаем `nmp install` в корне репозитория - это поставит нужные модули.

Для запуска я использовал Intellij IDEA Ultimate (есть триал), в Communiti Edition не хватило каких-то модулей.
Запускал из файлика `__tests__/index.js` конфигурацией `Current file`, тут важно что не `Check termins` - это почему-то не работало)

На 10 декабря 2022 скрипт помог найти термин за 5 дней и 26000 итераций.

### Configure `beep`:

Personnaly I use telegram message.
Thus use https://t.me/BotFather to create a bot
Next configure token and chat id
Optionally you can configure the notification message. 

```
const bot_token = "dummytoken";
const chat_id = "31337";
const notification_text = "Termin calls!";
```


### dockerize
```
docker build . -t termin
```

### Run on Mac:
```
xhost + ${hostname} 
ip=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
docker run --rm -it -e DISPLAY=$ip:0 -v /tmp/.X11-unix:/tmp/.X11-unix termin
```

xhost is required for x11 
to setup xhost use https://gist.github.com/sorny/969fe55d85c9b0035b0109a31cbcb088 guide