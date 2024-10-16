import {getAllQuiz} from "../services/api.js";

const app = {
    renderListQuiz: async function(){
        //1. Lấy danh sách các câu hỏi
        const data = await getAllQuiz(); // bất đồng bộ
        // console.log(data); // đồng bộ

        //2. Đổ dữ liệu ra danh sách
        const listQuiz = data?.map((item,index)=>{
            if(item.isActive){
                return `
                <a href="#" data-id="${item.id}" class="quiz-items list-group-item list-group-item-action list-group-item-primary">
                    ${item.title} : ${item.description}
                </a>
            `
            }
        }).join("") 

        // console.log(listQuiz);
        const listQuizElement = document.getElementById('list_quiz');
        //2.3 đổ ra element thông qua innerHTML
        listQuizElement.innerHTML = listQuiz;
        this.handleClickQuiz()

    },
    handleClickQuiz: function(){
        // 1. Lấy danh sách (mảng) các quiz
        const quizItems = document.querySelectorAll('.quiz-items');
        console.log(quizItems);
        quizItems.forEach((item)=>{
            // 2. Khai báo sự kiện
            item.addEventListener('click', ()=>{
                // 3. Xác nhận 
                const title = item.textContent;
                if(window.confirm(`Bạn có chắc chắn làm quiz: ${title}`)){
                    // lấy id:
                    // c1:
                    // const id = item.dataset.id;
                    // c2:
                    const id = item.getAttribute("data-id")

                    // console.log(id);
                    //  4. chuyển trang
                    window.location = `question.html?id=${id}`                    
                }                
            })
        })
        
    },
    start: function(){
        this.renderListQuiz();
    }
}

app.start()