const puppeteer = require('puppeteer');

module.exports = async () => {
  const browser = await (puppeteer.launch({ headless: true }));

  const page = await browser.newPage();

  // 进入页面
  await page.goto('https://m.jr.jd.com/spe/qyy/main/index.html?userType=67&sid=');

  // 等待页面加载完成
  await page.waitFor(2000);

  const res = await page.evaluate(() => {
    let results = {};
    let res = []
    const list = $('#qyy-body>.qyy>.wrap-container>.wrap>.section>.row>.swiper-container>.swiper-wrapper>.swiper-slide');

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const href = $(element).data('qyy-jumpt');
      const src = $(element).find('img').attr('src')
      const obj = {
        href,
        src
      }
      res.push(obj)
    }

    
    function unqiue(array) {
      let hash = {}, unqiueArr = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(!hash[element.src]) {
          unqiueArr.push(element);
          hash[element.src] = true
        }
      }
    
      return unqiueArr;
    }

    const filterArr = unqiue(res);

    const itemList = $('#qyy-body>.qyy>.wrap-container>.wrap>.section>.row').find('.licai-sku>.item');
    
    let itemArray = [];
    itemList.forEach(element => {
      const obj = {
        href: $(element).data('qyy-jumpt'),
        title: $(element).find('.title>span').text(),
        sub: $(element).find('.title>label').text(),
        rate: $(element).find('.value').text(),
        text: $(element).find('.desc').text()
      };
      itemArray.push(obj)
    });
    
    results.slideData = filterArr;
    results.moneyList = itemArray;

    return results;
  })
  
  await browser.close();
  
  return res;
}



