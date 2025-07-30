export default function decorate(block) {
   const innerDiv = block.querySelector("div > div"); // Select the inner <div> inside the "pageheader block"
    if (innerDiv) {
       // const htmlContent = `<body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script src="https://www.westpac.com.au/content/dam/public/spa/origin/static/js/runtime-main.618443fd.js" integrity="sha256-OnKq4ZKxFHtpcBALUCzuFfOyRiu8typDwv+Ur8/Aq4Q= sha384-p9aAG1Ys7+oeBXcI4WPPbaHvfHjZL7Y58aWvJEZ20ihkqx6HTbwU4FYvLe4viPv0 sha512-wojLZStSZ02NcBgbyQOJlgHW3AtKj8bTqCZ44AntqHylo0SP1wRtEGV1NT268mZNcI2kQevgHcKCVrIzOky3vA==" crossorigin="anonymous"></script><script src="https://www.westpac.com.au/content/dam/public/spa/origin/static/js/2.b91a2380.chunk.js" integrity="sha256-5r7C5U57CvE3rD3qJkN6i9O6C0RuhGFZqiNMGeHl5FI= sha384-7tn9UgRlakiR5N04lDb91vH85ulTJbpHJLK8zG5011yH4zVM/Wb1dV5j141jPEpv sha512-Df6zy81zOcLQh3ApBnr25uk6fmnGzdR1hiwDOfqah8cngKK9JBFJ0RN+5JMvZuvx0K9x+85G1fG57FB+mX0R3g==" crossorigin="anonymous"></script><script src="https://www.westpac.com.au/content/dam/public/spa/origin/static/js/main.111858c2.chunk.js" integrity="sha256-ho0gHY8SRQ71X0XPpkRiaNH8Ffhze7qVvJ/VWr50heQ= sha384-Z+TT0ibH36C1VtyPn13w8rKWkS03oKnyC8kWBCie7o4qMxH+d8KEIh0GimmtwRzB sha512-JLdbztZWUV6SYxcDwne+zIqTa6WtQdtNR9jiglB17E+kXIiSMrAfGkTcS+v2F8xM0K7hzBw1D41Vbbf6QyMP0A==" crossorigin="anonymous"></script></body>`;
      // Append the HTML content
      // innerDiv.insertAdjacentHTML("beforeend", htmlContent);
    }
}
