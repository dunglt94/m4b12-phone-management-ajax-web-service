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
                <td><button type="button" onclick="editSmartphone(${data[i].id})">Edit</button></td>
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
    $.ajax(
        {
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
        }
    );
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

function editSmartphone(id) {
    $.ajax({
        url: `http://localhost:8080/api/smartphones/${id}`,
        type: "GET",
        success: function (data) {
            $('#producer').val(data.producer);
            $('#model').val(data.model);
            $('#price').val(data.price);
            $('#create').hide();
            let content = `
               <button type="button" id="save" onclick="updateNewSmartPhone(${data.id})">Save</button>`;
            $('#add-smartphone #buttons').append(content);
        }
    });
}

function updateNewSmartPhone(id) {
    event.preventDefault();
    //lấy dữ liệu từ form html
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let updatedSmartphone = {
        id: id,
        producer: producer,
        model: model,
        price: price
    };
    $.ajax({
        url: `http://localhost:8080/api/smartphones/${id}`,
        type: "PUT",
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(updatedSmartphone),
        success: function () {
            $('#producer').val("");
            $('#model').val("");
            $('#price').val("");
            $('#create').show();
            $('#save').remove();
            showAllPhones();
        }
    });
}
