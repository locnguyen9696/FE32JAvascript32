var nguoiDungService = new NguoiDungService();

function themTestGit() {
    console.log("Them nguoi dung locnguyen2");
}
getListUser();

getEle("btnThemNguoiDung").addEventListener("click", function () {
    var title = "Them Nguoi Dung";
    var footer = `
    <button class="btn btn-success" onclick="themNguoiDung()">Them</button>
    `;
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})
// Them Nguoi Dung
function themNguoiDung() {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var user = new nguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    nguoiDungService.themNguoiDung(user)
        .then(function (result) {
            console.log(result.data);
            getListUser();
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getListUser() {
    nguoiDungService.layDanhSachNguoiDung()
        .then(function (result) {
            setLocalStorage(result.data)
            rederTable(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getEle(id) {
    return document.getElementById(id);
}
// Xóa
function xoa(id) {
    nguoiDungService.xoaNguoiDung(id)
        .then(function (result) {
            console.log(result);
            getListUser();
        })
        .catch(function (error) {
            console.log(error);
            // alert("thông báo");
        })
}
// Sửa
function sua(id) {
    var title = "Sửa người dùng";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;

    var footer = `
    <button class="btn btn-success" onclick="capNhat(${id})">Cập nhật</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    nguoiDungService.layThongTinUser(id)
        .then(function (result) {
            console.log(result);
            getEle("TaiKhoan").setAttribute("disabled", true);
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("SoDienThoai").value = result.data.soDT;
            getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        })
        .catch(function (error) {
            console.log(error);
            // alert("thông báo");
        })
}
// Cập nhật
function capNhat(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var user = new nguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    nguoiDungService.capNhatNguoiDung(id, user)
        .then(function (result) {
            getListUser();

        })
        .catch(function (err) {
            console.log(err);
        })
}
// Lưu mảng người dùng xuống localstorage
function setLocalStorage(mangNguoiDung) {
    localStorage.setItem("Danh Sach Nguoi Dung", JSON.stringify(mangNguoiDung));
}
// Lấy mảng người dùng xuống localStorage
function getLocalStorage() {
    if (localStorage.getItem("Danh Sach Nguoi Dung")) {
        return JSON.parse(localStorage.getItem("Danh Sach Nguoi Dung"));
    }
}
// Chức năng tìm kiếm
getEle("txtSearch").addEventListener("keyup", function () {
    var chuoiTimKiem = getEle("txtSearch").value;
    var mangNguoiDung = getLocalStorage();
    var mangTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, mangNguoiDung);
    rederTable(mangTimKiem);
})

