function NguoiDungService() {

    this.themNguoiDung = function (nguoiDung) {
        return axios({
            method: "POST",
            url: "http://5dbad0763ec5fb0014319622.mockapi.io/api/NGUOIDUNG",
            data: nguoiDung,
        })
    };

    this.layDanhSachNguoiDung = function () {
        // GET: lấy danh sách người dùng về
        // POST: thêm người dùng lên server
        // PUT: cập nhật người dùng
        // DELETE: xóa người dùng
        return axios({
            method: "GET",
            url: "http://5dbad0763ec5fb0014319622.mockapi.io/api/NGUOIDUNG",
            // => Trả về promise
        });
    };
    this.xoaNguoiDung = function (id) {
        return axios({
            method: "DELETE",
            url: `http://5dbad0763ec5fb0014319622.mockapi.io/api/NGUOIDUNG/${id}`,
        })
    };
    this.layThongTinUser = function (id) {
        return axios({
            method: "GET",
            url: `http://5dbad0763ec5fb0014319622.mockapi.io/api/NGUOIDUNG/${id}`,
        });
    }
    this.capNhatNguoiDung = function (id, user) {
        return axios({
            method: "PUT",
            url: `http://5dbad0763ec5fb0014319622.mockapi.io/api/NGUOIDUNG/${id}`,
            data: user,
        })
    };

    this.timKiemNguoiDung = function (chuoiTimKiem, mangNguoiDung) {
        // Cách 1:
        //     // 1 tao mang rong mangTimKiem
        //     // 2 duyet mangNguoiDung
        //     // 3 sd ham indexOf so sánh
        //     // 4 Thêm người dùng tìm vào mảng tìm kiếm
        //     var mangTimKiem = [];
        //     mangNguoiDung.map(function (item) {
        //         if (item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
        //             mangTimKiem.push(item);
        //         }
        //     });
        //     return mangTimKiem;
        // CÁCH 2:
        return mangNguoiDung.filter(function (item) {
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
        })
    }

}
function rederTable(mangUser) {
    var contentHTML = "";
    mangUser.map(function (item, index) {
        contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.matKhau}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.soDT}</td>
            <td>${item.maLoaiNguoiDung}</td>
            <td>
                <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="sua(${item.id})">Sửa</button>
                <button class="btn btn-danger" onclick="xoa(${item.id})">Xóa</button>
            </td>
        </tr>        
    `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}
