
async function getData(){
    
    const res = await fetch("/clinics")

    const {userClinics, userId} =  await res.json()
    
    document.getElementById("show_data").innerText = `O usuário é ${userId}`

}

getData()