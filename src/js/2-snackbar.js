import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            };
        }, delay);
    });
    promise.then((value) => {
        iziToast.show({
            message: value,
            position: 'topRight',
            backgroundColor: '#59a10d',
            messageColor: 'white',
            close: false,
        });
    })
        .catch((error) => {
            iziToast.show({
                message: error,
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: 'white',
                close: false,
            });
        });
    form.reset();
};