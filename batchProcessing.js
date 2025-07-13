batch of size x, it means only x request can be sent in a second so deliberately simulate a delay of 1 second 

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function batchCall(urls, fetchFn) {
  const BATCH_SIZE = 3;
  const result = new Array(urls.length);

  // Attach indexes to preserve result order
  const indexedUrls = urls.map((url, index) => ({ url, index }));

  for (let i = 0; i < indexedUrls.length; i += BATCH_SIZE) {
    const batch = indexedUrls.slice(i, i + BATCH_SIZE);

    // Launch all fetches in parallel for current batch
    const batchPromises = batch.map(({ url, index }) =>
      fetchFn(url).then(res => {
        result[index] = res;
      })
    );

    // Wait for all batch fetches to complete
    await Promise.all(batchPromises);

    // Wait 1 second if there's another batch
    if (i + BATCH_SIZE < indexedUrls.length) {
      await delay(1000);
    }
  }

  return result;
}


const urls = [
  "https://api.moneycontrol.com/stock/1",
  "https://api.moneycontrol.com/stock/2",
  "https://api.moneycontrol.com/stock/3",
  "https://api.moneycontrol.com/stock/4",
  "https://api.moneycontrol.com/stock/5",
  "https://api.moneycontrol.com/stock/6"
];

function mockFetch(url) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Fetched: ${url}`), 100); // simulate latency
  });
}

batchCall(urls, mockFetch).then(console.log);







----------------------------------------------------------------------------------

classic concurrency-limited task runner

async function batchCall(urls, fetchFn, limit) {
  const result = new Array(urls.length);
  let i = 0;

  // Runner function - will keep starting new tasks
  async function runner() {
    while (i < urls.length) {
      const currentIndex = i++;
      try {
        const res = await fetchFn(urls[currentIndex]);
        result[currentIndex] = res;
      } catch (err) {
        result[currentIndex] = err; // optionally handle errors
      }
    }
  }

  // Start `limit` parallel runners
  const workers = [];
  for (let j = 0; j < limit; j++) {
    workers.push(runner());
  }

  await Promise.all(workers);
  return result;
}


function mockFetch(url) {
  return new Promise((resolve) => {
    const delay = Math.random() * 1000; // simulate variable API delay
    setTimeout(() => resolve(`Fetched ${url}`), delay);
  });
}

const urls = Array.from({ length: 10 }, (_, i) => `url/${i + 1}`);

batchCall(urls, mockFetch, 5).then(console.log);

