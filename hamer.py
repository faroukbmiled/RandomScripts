# js autoclick tanslated to python using BeautifulSoup (random poc)
import requests
from bs4 import BeautifulSoup
import webbrowser


headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en,en-US;q=0.9',
    'Connection': 'keep-alive',
    'Cookie': 'urcookiehere',
    'Host': 'link',
    'Referer': 'link',
    'sec-ch-ua': 'Opera GX;v="93", "Not/A)Brand";v="8", "Chromium";v="107"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': 'Windows',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 OPR/93.0.0.0 (Edition std-1)'
}

visited_links = []

def fetch_and_check_data():
    response = requests.get('link', headers=headers)
    print("response time:", response.elapsed.total_seconds(), "seconds")
    soup = BeautifulSoup(response.text, 'html.parser')
    time_elements = soup.select('time.u-dt:not([class*=" "])')
    target_time_element = None
    for element in time_elements:
        if element.text == 'A moment ago':
            target_time_element = element
            break
    if target_time_element:
            link_element = target_time_element.find_parent('a')
            if link_element:
                url = link_element['href']
                if url in visited_links:
                    return
                visited_links.append(url)
                url = f"https://link/{url}"
                webbrowser.open(url, new=2)
                return

while True:
    fetch_and_check_data()
