// document.addEventListener('DOMContentLoaded', function () {
const checkBoxList = document.querySelectorAll('.custom-checkbox');


const inputFields = document.querySelectorAll('.goal-input')
const errormssg = document.querySelector('.warning')
const progressBar = document.querySelector('.progress_bar')
const progressStatus = document.querySelector('.progress_status')


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}


let count = Object.values(allGoals).filter((goal) => goal.completed).length;
// if(count == 0 ){
//     progressBar.classList.remove('one-done', 'two-done', 'three-done')
// }
{
    progressBar.classList.remove('one-done', 'two-done', 'three-done')
    if (count == 1) progressBar.classList.add('one-done')
    if (count == 2) progressBar.classList.add('two-done')
    if (count == 3) progressBar.classList.add('three-done')

    if (count != 0) {
        progressStatus.firstElementChild.style.display = "block";
        progressStatus.firstElementChild.innerText = `${count}/3 tasks done`;
    } else {
        progressStatus.firstElementChild.style.display = "none";
    }

}
checkBoxList.forEach((checkbox) => {

    checkbox.addEventListener('click', (e) => {



        let allFilled = [...inputFields].every((input) => {
            return input.value;
        })
        if (allFilled) {
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed;


            localStorage.setItem('allGoals', JSON.stringify(allGoals))
            count = Object.values(allGoals).filter((goal) => goal.completed).length;
            {
                progressBar.classList.remove('one-done', 'two-done', 'three-done')
                if (count == 1) progressBar.classList.add('one-done')
                if (count == 2) progressBar.classList.add('two-done')
                if (count == 3) progressBar.classList.add('three-done')
                if (count != 0) {
                    progressStatus.firstElementChild.style.display = "block";
                    progressStatus.firstElementChild.innerText = `${count}/3 tasks done`;
                } else {
                    progressStatus.firstElementChild.style.display = "none";
                }
            }

            progressBar.classList.remove('show-error')
            checkbox.parentElement.classList.toggle('completed');

        }
        else {
            errormssg.parentElement.classList.add('show-error')
            // progressBar.classList.add('show-error')

        }
    });
});

inputFields.forEach((input) => {

    // input.value = allGoals[input.id].name;
    input.value = allGoals[input.id]?.name || "";
    if (allGoals[input.id]?.completed) {
        input.parentElement.classList.add('completed');
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })

    input.addEventListener('input', (e) => {
        input.parentElement.classList.remove('completed')

        // console.log(input.id)
        allGoals[input.id] = {
            name: input.value,
            completed: false
        }
        count = Object.values(allGoals).filter((goal) => goal.completed).length;
        {
            progressBar.classList.remove('one-done', 'two-done', 'three-done')
            if (count == 1) progressBar.classList.add('one-done')
            if (count == 2) progressBar.classList.add('two-done')
            if (count == 3) progressBar.classList.add('three-done')
            if (count != 0) {
                progressStatus.firstElementChild.style.display = "block";
                progressStatus.firstElementChild.innerText = `${count}/3 tasks done`;
            } else {
                progressStatus.firstElementChild.style.display = "none";
            }
        }

        localStorage.setItem('allGoals', JSON.stringify(allGoals))

    })
})


// });