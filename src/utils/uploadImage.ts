"use client"

const api_key = 'https://api.imgbb.com/1/upload?key=7c5149d68aa7c8554ec08575ce91bdaa'

export async function uploadImage(image: any) {

    let liveUrl = null;
    const formData = new FormData();
    formData.append('image', image);

    await fetch(api_key, {
        method: 'POST',
        body: formData
    })
        .then((res) => res.json())
        .then((imgResponse) => {
            if (imgResponse.success) {
                liveUrl = imgResponse.data.url;
            } else {
                liveUrl = null;
            }
        })
    return liveUrl
};