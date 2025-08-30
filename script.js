document.addEventListener('DOMContentLoaded', function () {
    const checkBoxList = document.querySelectorAll('.custom-checkbox');


    const inputFields = document.querySelectorAll('.goal-input')
    const errormssg = document.querySelector('.warning')
    const progressBar = document.querySelector('.progress_bar')
    const progressStatus = document.querySelector('.progress_status')


    const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

    checkBoxList.forEach((checkbox) => {

        checkbox.addEventListener('click', (e) => {

    

            let allFilled = [...inputFields].every((input) => {
                return input.value;
            })
            if (allFilled) {
                // let count = 0;

                const inputId = checkbox.nextElementSibling.id
                allGoals[inputId].completed = !allGoals[inputId].completed;
                localStorage.setItem('allGoals', JSON.stringify(allGoals))

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
        if(allGoals[input.id].completed) input.parentElement.classList.add('completed')

        input.addEventListener('focus', () => {
            progressBar.classList.remove('show-error')
        })

        input.addEventListener('input',(e)=>{
            // console.log(input.id)
            allGoals[input.id] = {
                name : input.value,
                completed : false
            }
            console.log(allGoals)
            localStorage.setItem('allGoals', JSON.stringify(allGoals))

        } )
    })


});