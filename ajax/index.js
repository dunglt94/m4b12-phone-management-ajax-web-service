function showAllPhones() {
    $.ajax({
        //tên API
        url: "http://localhost:8080/api/smartphones",
        type: "GET",
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                <td>${data[i].producer}</td>
                <td>${data[i].model}</td>
                <td>${data[i].price}</td>
                <td><button type="button" onclick="deleteSmartphone(${data[i].id})">Delete</button></td>
                </tr>`;
            }
            $("#list").html(content);
        }
    });
}
showAllPhones();

function addNewSmartPhone() {
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
    //lấy dữ liệu từ form html
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    // gọi phương thức ajax
    $.ajax({
        //tên API
        url: "http://localhost:8080/api/smartphones/",
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(newSmartphone),
        //xử lý khi thành công
        success: function(){
            console.log("success")
            showAllPhones()
        }
    });
}

function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        //tên API
        url: `http://localhost:8080/api/smartphones/${id}`,
        //xử lý khi thành công
        success: function () {
            showAllPhones();
        }
    });
}