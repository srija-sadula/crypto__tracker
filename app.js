const form = document.querySelector("#SearchForm");
const res = document.querySelector("#tableResult");
const xyz = document.getElementById("allContaint");
var upd;

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (upd) {
    clearTimeout(upd);
  }

  const ctype = form.elements.CoinType.value;
  xyz.classList.add("mainClick");
  xyz.classList.remove("main");
  fetchPrice(ctype);
});

const fetchPrice = async (ctype) => {
  const r = await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`);
  const price = r.data.ticker.price;
  const volume = r.data.ticker.volume;
  const change = r.data.ticker.change;
  const base = r.data.ticker.base;
  const target = r.data.ticker.target;
  const time = timeConverter(r.data.timestamp);

  res.innerHTML = `<tr style ="background-color:#8B0000; color:white; font-weight:700">
   <td>
     Property
   </td>
   <td> Value</td>
 </tr>
 <tr>
    <td><b>
      ${base}
    </b></td>
    <td>${price} ${target}</td>
 </tr>
 <tr>
    <td><b>
      Volume
   </b></td>
   <td>${volume}</td>
 </tr>
 <tr>
  <td><b>
     change
   </b></td>
   <td>${change}</td>
 </tr>
 <tr>
   <td><b>
      Last Update
   <b></td>
   <td>${time}</td>
 </tr>`;

  upd = setTimeout(() => fetchPrice(ctype), 10000);
};

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}
