const IMG={
  ao:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
  ao2:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85",
  quan:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
  giay:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
  tui:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
  sneaker2:"https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=85"
};
const seedProducts=[
{id:"P001",name:"Áo thun Essential",price:199000,old:249000,cat:"Áo",stock:35,sizes:["S","M","L","XL"],image:IMG.ao,tag:"BEST SELLER",desc:"Áo thun cotton mềm, form relaxed dễ phối cùng jeans, cargo hoặc short."},
{id:"P002",name:"Oversize Street Tee",price:249000,old:299000,cat:"Áo",stock:24,sizes:["M","L","XL"],image:IMG.ao2,tag:"NEW",desc:"Thiết kế oversize trẻ trung với chất liệu thoáng nhẹ, phù hợp phong cách streetwear."},
{id:"P003",name:"Classic Blue Jeans",price:499000,old:0,cat:"Quần",stock:18,sizes:["28","29","30","31","32"],image:IMG.quan,tag:"TRENDING",desc:"Quần jeans xanh form straight, dễ mặc và bền màu."},
{id:"P004",name:"Urban Sneaker",price:699000,old:799000,cat:"Giày",stock:12,sizes:["39","40","41","42","43"],image:IMG.giay,tag:"HOT",desc:"Sneaker đế êm, thiết kế tối giản phù hợp đi học, đi làm và đi chơi."},
{id:"P005",name:"Daily Backpack",price:429000,old:0,cat:"Phụ kiện",stock:20,sizes:["FREE"],image:IMG.tui,tag:"NEW",desc:"Balo đa ngăn, gọn nhẹ, phù hợp laptop và đồ dùng hàng ngày."},
{id:"P006",name:"Retro Runner",price:749000,old:899000,cat:"Giày",stock:9,sizes:["39","40","41","42"],image:IMG.sneaker2,tag:"SALE",desc:"Sneaker phong cách retro với đệm chân êm ái."}
];

function initData(){
 if(!localStorage.products) localStorage.products=JSON.stringify(seedProducts);
 if(!localStorage.users) localStorage.users=JSON.stringify([{name:"Admin",email:"admin@manhfashion.vn",password:"123456",phone:"0988123456"}]);
 if(!localStorage.cart) localStorage.cart="[]";
 if(!localStorage.orders) localStorage.orders="[]";
}
initData();
const products=()=>JSON.parse(localStorage.products||"[]");
const cart=()=>JSON.parse(localStorage.cart||"[]");
const saveCart=x=>localStorage.cart=JSON.stringify(x);
const money=n=>Number(n).toLocaleString("vi-VN")+" ₫";
const user=()=>JSON.parse(localStorage.currentUser||"null");
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

function toast(msg){let x=document.getElementById("toast");if(!x)return;x.className="toast show";x.textContent=msg;clearTimeout(window.tt);window.tt=setTimeout(()=>x.className="toast",2300)}
function header(){
 const u=user(), count=cart().reduce((a,b)=>a+b.qty,0);
 document.getElementById("header").innerHTML=`<nav class="navbar"><a class="logo" href="index.html">MF.</a><div class="nav-links"><a href="index.html">Trang chủ</a><a href="san-pham.html">Sản phẩm</a><a href="don-hang.html">Đơn hàng</a><a href="cua-hang.html">Cửa hàng</a>${u?`<a href="tai-khoan.html">Tài khoản</a>`:""}</div><div class="nav-actions"><a class="icon-btn" href="san-pham.html" title="Tìm kiếm">⌕</a><a class="icon-btn cart-pill" href="gio-hang.html">🛒<span class="cart-count">${count}</span></a>${u?`<button class="icon-btn" onclick="logout()" title="Đăng xuất">↪</button>`:`<a class="btn btn-dark" href="dang-nhap.html">Đăng nhập</a>`}</div></nav>`;
}
function footer(){let f=document.getElementById("footer");if(f)f.className="footer",f.innerHTML=`<div class="footer-grid"><div><div class="logo">MF.</div><p style="color:#aaa;max-width:420px;line-height:1.8">Mạnh Fashion — thời trang trẻ trung, năng động và hiện đại. Ship toàn quốc.</p></div><div><b>Khám phá</b><a href="san-pham.html">Tất cả sản phẩm</a><a href="don-hang.html">Đơn hàng</a><a href="cua-hang.html">Cửa hàng</a></div><div><b>Hỗ trợ</b><a href="tai-khoan.html">Tài khoản</a><a href="lien-he.html">Liên hệ</a><a href="quan-ly.html">Quản lý sản phẩm</a></div></div><div class="footer-bottom">© 2026 Mạnh Fashion · COD · Ngân hàng · Ví điện tử · Ship toàn quốc</div>`}
function initLayout(){header();footer()}
function initHome(){initLayout();document.getElementById("featured").innerHTML=products().slice(0,4).map(card).join("")}
function card(p){return `<article class="product-card"><a href="chi-tiet.html?id=${p.id}"><div class="product-image"><img src="${p.image}" alt="${esc(p.name)}"><span class="tag">${esc(p.tag)}</span></div></a><div class="product-info"><h3>${esc(p.name)}</h3><div class="price">${money(p.price)} ${p.old?`<span class="old-price">${money(p.old)}</span>`:""}</div><div class="card-actions"><a class="mini-btn" href="chi-tiet.html?id=${p.id}">Chi tiết</a><button class="mini-btn dark" onclick="addToCart('${p.id}',1,'${p.sizes[0]}')">+ Thêm giỏ</button></div></div></article>`}
function initProducts(){
 initLayout();
 const params=new URLSearchParams(location.search), q=params.get("q")||"", cat=params.get("cat")||"";
 document.getElementById("search").value=q;document.getElementById("catFilter").value=cat;
 ["search","catFilter","sort"].forEach(id=>document.getElementById(id).addEventListener("input",renderProducts));
 renderProducts();
}
function renderProducts(){
 let q=document.getElementById("search").value.toLowerCase(),cat=document.getElementById("catFilter").value,sort=document.getElementById("sort").value;
 let arr=products().filter(p=>(p.name.toLowerCase().includes(q)||p.id.toLowerCase().includes(q))&&(!cat||p.cat===cat));
 if(sort==="low")arr.sort((a,b)=>a.price-b.price);if(sort==="high")arr.sort((a,b)=>b.price-a.price);
 document.getElementById("productGrid").innerHTML=arr.length?arr.map(card).join(""):`<div class="empty" style="grid-column:1/-1"><h2>Không tìm thấy sản phẩm</h2><p class="muted">Thử từ khóa khác nhé.</p></div>`;
}
function initDetail(){
 initLayout();let id=new URLSearchParams(location.search).get("id"),p=products().find(x=>x.id===id);
 if(!p){location.href="san-pham.html";return}
 let sizes=p.sizes.map((s,i)=>`<button type="button" class="size ${i===0?"selected":""}" onclick="selectSize(this)">${s}</button>`).join("");
 document.getElementById("detail").innerHTML=`<section class="detail"><div><img class="detail-main-img" src="${p.image}" alt="${esc(p.name)}"></div><div><span class="eyebrow">${p.cat} · ${p.id}</span><h1>${esc(p.name)}</h1><div class="detail-price">${money(p.price)} ${p.old?`<span class="old-price">${money(p.old)}</span>`:""}</div><p class="muted" style="line-height:1.8">${esc(p.desc)}</p><h3>Chọn size</h3><div class="size-list">${sizes}</div><h3>Số lượng</h3><div class="qty"><button onclick="changeQty(-1)">−</button><input id="detailQty" value="1" readonly><button onclick="changeQty(1)">+</button></div><div class="detail-actions"><button class="btn btn-dark" onclick="buyNow('${p.id}')">Mua ngay →</button><button class="btn btn-light" onclick="detailAdd('${p.id}')">🛒 Thêm vào giỏ</button></div><div class="info-box"><h3>Thông tin sản phẩm</h3><p class="muted">Chất liệu chọn lọc · form hiện đại · kiểm tra kỹ trước khi gửi.</p></div><div class="info-box"><h3>Chính sách đổi trả</h3><p class="muted">Đổi size trong 7 ngày nếu sản phẩm còn nguyên tag, chưa qua sử dụng. Sản phẩm lỗi từ cửa hàng được hỗ trợ đổi miễn phí.</p></div><div class="info-box"><h3>Vận chuyển</h3><p class="muted">Ship toàn quốc. Hỗ trợ COD, chuyển khoản ngân hàng và ví điện tử.</p></div></div></section>`;
}
function selectSize(b){document.querySelectorAll(".size").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")}
function changeQty(n){let x=document.getElementById("detailQty"),v=Math.max(1,Number(x.value)+n);x.value=v}
function selectedSize(){return document.querySelector(".size.selected")?.textContent||"FREE"}
function detailAdd(id){let q=Number(document.getElementById("detailQty").value);addToCart(id,q,selectedSize())}
function addToCart(id,qty=1,size="FREE"){let p=products().find(x=>x.id===id);if(!p)return;let c=cart(),item=c.find(x=>x.id===id&&x.size===size);if(item)item.qty=Math.min(p.stock,item.qty+qty);else c.push({id,size,qty});saveCart(c);header();toast("Đã thêm vào giỏ hàng ✓")}
function buyNow(id){detailAdd(id);location.href="thanh-toan.html"}
function initCart(){initLayout();renderCart()}
function renderCart(){
 let c=cart(),el=document.getElementById("cartPage");if(!c.length){el.innerHTML=`<div class="empty card"><h2>Giỏ hàng đang trống 🛒</h2><p class="muted">Hãy chọn vài item bạn thích.</p><a class="btn btn-dark" href="san-pham.html">Mua sắm ngay →</a></div>`;return}
 let ps=products(),subtotal=0,html="";
 c.forEach((i,idx)=>{let p=ps.find(x=>x.id===i.id);if(!p)return;subtotal+=p.price*i.qty;html+=`<div class="cart-item"><img src="${p.image}"><div><h3>${esc(p.name)}</h3><p class="muted">Size: ${esc(i.size)} · ${money(p.price)}</p><div class="qty"><button onclick="cartQty(${idx},-1)">−</button><input value="${i.qty}" readonly><button onclick="cartQty(${idx},1)">+</button></div></div><div style="text-align:right"><b>${money(p.price*i.qty)}</b><br><button class="remove" onclick="removeCart(${idx})">Xóa</button></div></div>`});
 el.innerHTML=`<div class="cart-layout"><div class="card">${html}</div><aside class="card"><h2>Tóm tắt</h2><div class="summary-line"><span>Tạm tính</span><b>${money(subtotal)}</b></div><div class="summary-line"><span>Vận chuyển</span><b>Toàn quốc</b></div><div class="total summary-line"><span>Tổng</span><b>${money(subtotal)}</b></div><a class="btn btn-dark full" href="thanh-toan.html">Thanh toán →</a><button class="btn btn-light full" onclick="clearCart()">Xóa giỏ hàng</button></aside></div>`;
}
function cartQty(idx,n){let c=cart(),p=products().find(x=>x.id===c[idx].id);c[idx].qty=Math.max(1,Math.min(p.stock,c[idx].qty+n));saveCart(c);header();renderCart()}
function removeCart(i){let c=cart();c.splice(i,1);saveCart(c);header();renderCart();toast("Đã xóa sản phẩm")}
function clearCart(){if(confirm("Xóa toàn bộ giỏ hàng?")){saveCart([]);header();renderCart()}}
function initCheckout(){
 initLayout();let c=cart();if(!c.length){location.href="gio-hang.html";return}
 let total=c.reduce((s,i)=>{let p=products().find(x=>x.id===i.id);return s+p.price*i.qty},0), discount=0;
 let u=user();if(u){shipName.value=u.name;shipPhone.value=u.phone}
 document.getElementById("checkoutSummary").innerHTML=`<h2>Đơn hàng</h2>${c.map(i=>{let p=products().find(x=>x.id===i.id);return `<div class="summary-line"><span>${esc(p.name)} × ${i.qty}</span><b>${money(p.price*i.qty)}</b></div>`}).join("")}<hr><div class="voucher"><input id="voucher" placeholder="Mã giảm giá"><button class="btn btn-dark" type="button" onclick="applyVoucher()">Áp dụng</button></div><p id="voucherMsg" class="muted small"></p><div id="discountLine"></div><div class="total summary-line"><span>Tổng thanh toán</span><b id="checkoutTotal">${money(total)}</b></div>`;
 document.querySelectorAll('input[name="payment"]').forEach(x=>x.addEventListener("change",paymentInfo));paymentInfo();
 document.getElementById("checkoutForm").addEventListener("submit",e=>{e.preventDefault();placeOrder()});
}
let checkoutDiscount=0;
function applyVoucher(){let v=document.getElementById("voucher").value.trim().toUpperCase(),c=cart(),t=c.reduce((s,i)=>s+products().find(p=>p.id===i.id).price*i.qty,0);if(v==="WELCOME10"){checkoutDiscount=Math.round(t*.1);voucherMsg.textContent="✓ Giảm 10%";}else if(v==="FASHION50"){checkoutDiscount=Math.min(50000,t);voucherMsg.textContent="✓ Giảm tối đa 50.000 ₫";}else{checkoutDiscount=0;voucherMsg.textContent="Mã không hợp lệ";}document.getElementById("discountLine").innerHTML=`<div class="summary-line"><span>Giảm giá</span><b>-${money(checkoutDiscount)}</b></div>`;document.getElementById("checkoutTotal").textContent=money(t-checkoutDiscount)}
function paymentInfo(){let p=document.querySelector('input[name="payment"]:checked')?.value,x=document.getElementById("payInfo");x.innerHTML=p==="BANK"?"Ngân hàng: MB Bank · STK: 0123456789 · Chủ TK: MANH FASHION":p==="EWALLET"?"Ví điện tử: MoMo / ZaloPay. Đây là giao diện demo, không phát sinh giao dịch thật.":"Bạn thanh toán tiền mặt cho shipper khi nhận hàng."}
function placeOrder(){let c=cart(),name=shipName.value.trim(),phone=shipPhone.value.trim(),city=shipCity.value.trim(),address=shipAddress.value.trim();if(!name||!phone||!city||!address){toast("Vui lòng nhập đủ thông tin nhận hàng");return}let total=c.reduce((s,i)=>s+products().find(p=>p.id===i.id).price*i.qty,0)-checkoutDiscount;let orders=JSON.parse(localStorage.orders||"[]");let order={id:"MF"+Date.now().toString().slice(-8),date:new Date().toLocaleString("vi-VN"),items:c,total,status:"Đang xử lý",payment:document.querySelector('input[name="payment"]:checked').value,receiver:{name,phone,city,address}};orders.unshift(order);localStorage.orders=JSON.stringify(orders);saveCart([]);header();alert("Đặt hàng thành công! Mã đơn: "+order.id);location.href="don-hang.html"}
function initOrders(){initLayout();let el=document.getElementById("orders"),u=user();if(!u){el.innerHTML=`<div class="card empty"><h2>Đăng nhập để xem đơn hàng</h2><a class="btn btn-dark" href="dang-nhap.html">Đăng nhập →</a></div>`;return}let orders=JSON.parse(localStorage.orders||"[]");el.innerHTML=orders.length?orders.map(o=>`<div class="card order-card"><div class="order-head"><div><b>${o.id}</b><p class="muted small">${o.date} · ${o.payment}</p></div><span class="status">${o.status}</span></div><p><b>Người nhận:</b> ${esc(o.receiver.name)} · ${esc(o.receiver.phone)}</p><p><b>Địa chỉ:</b> ${esc(o.receiver.address)}, ${esc(o.receiver.city)}</p><div class="total">Tổng: ${money(o.total)}</div></div>`).join(""):`<div class="card empty"><h2>Chưa có đơn hàng</h2><a class="btn btn-dark" href="san-pham.html">Mua sắm ngay →</a></div>`}
function initAccount(){initLayout();let el=document.getElementById("profile"),u=user();if(!u){el.innerHTML=`<div class="empty"><h2>Chưa đăng nhập</h2><a class="btn btn-dark" href="dang-nhap.html">Đăng nhập →</a></div>`;return}el.innerHTML=`<div class="profile-avatar">${esc(u.name[0]||"M")}</div><h2>${esc(u.name)}</h2><p class="muted">${esc(u.email)}</p><p>📞 ${esc(u.phone)}</p><button class="btn btn-dark" onclick="logout()">Đăng xuất</button>`}
function logout(){localStorage.removeItem("currentUser");toast("Đã đăng xuất");setTimeout(()=>location.href="index.html",500)}
function initLogin(){let f=document.getElementById("loginForm");f.addEventListener("submit",e=>{e.preventDefault();let email=loginEmail.value.trim().toLowerCase(),pass=loginPass.value,us=JSON.parse(localStorage.users||"[]"),u=us.find(x=>x.email.toLowerCase()===email&&x.password===pass);if(!u){toast("Sai email hoặc mật khẩu");return}localStorage.currentUser=JSON.stringify(u);location.href="index.html"})}
function initRegister(){document.getElementById("registerForm").addEventListener("submit",e=>{e.preventDefault();let name=regName.value.trim(),email=regEmail.value.trim().toLowerCase(),pass=regPass.value,pass2=regPass2.value,phone=regPhone.value.trim(),us=JSON.parse(localStorage.users||"[]");if(pass!==pass2){toast("Mật khẩu nhập lại chưa đúng");return}if(us.some(x=>x.email.toLowerCase()===email)){toast("Email đã được đăng ký");return}let u={name,email,password:pass,phone};us.push(u);localStorage.users=JSON.stringify(us);localStorage.currentUser=JSON.stringify(u);toast("Đăng ký thành công ✓");setTimeout(()=>location.href="index.html",600)})}
function togglePass(id,b){let x=document.getElementById(id);x.type=x.type==="password"?"text":"password";b.textContent=x.type==="password"?"Hiện":"Ẩn"}
function initAdmin(){initLayout();renderAdmin();document.getElementById("adminForm").addEventListener("submit",saveAdmin)}
function renderAdmin(){let arr=products();document.getElementById("adminTable").innerHTML=`<div class="table-wrap"><table class="admin-table"><thead><tr><th>Sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Kho</th><th>Thao tác</th></tr></thead><tbody>${arr.map(p=>`<tr><td><b>${esc(p.name)}</b><br><span class="muted small">${p.id}</span></td><td>${p.cat}</td><td>${money(p.price)}</td><td>${p.stock}</td><td><button class="mini-btn" onclick="editAdmin('${p.id}')">Sửa</button> <button class="mini-btn" onclick="deleteAdmin('${p.id}')">Xóa</button></td></tr>`).join("")}</tbody></table></div>`}
function openAdminForm(id){document.getElementById("adminModal").classList.add("show");document.getElementById("adminForm").reset();document.getElementById("editId").value=id||"";if(!id){modalTitle.textContent="Thêm sản phẩm";return}let p=products().find(x=>x.id===id);modalTitle.textContent="Sửa sản phẩm";aName.value=p.name;aPrice.value=p.price;aCat.value=p.cat;aStock.value=p.stock;aImage.value=p.image}
function closeAdminForm(){document.getElementById("adminModal").classList.remove("show")}
function editAdmin(id){openAdminForm(id)}
function saveAdmin(e){e.preventDefault();let arr=products(),id=editId.value;if(id){let p=arr.find(x=>x.id===id);Object.assign(p,{name:aName.value,price:Number(aPrice.value),cat:aCat.value,stock:Number(aStock.value),image:aImage.value})}else{arr.push({id:"P"+String(Date.now()).slice(-5),name:aName.value,price:Number(aPrice.value),old:0,cat:aCat.value,stock:Number(aStock.value),sizes:["S","M","L","XL"],image:aImage.value,tag:"NEW",desc:"Sản phẩm mới của Mạnh Fashion."})}localStorage.products=JSON.stringify(arr);closeAdminForm();renderAdmin();toast("Đã lưu sản phẩm ✓")}
function deleteAdmin(id){if(confirm("Xóa sản phẩm này?")){localStorage.products=JSON.stringify(products().filter(p=>p.id!==id));renderAdmin();toast("Đã xóa sản phẩm")}}
