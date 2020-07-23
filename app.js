const timmer = document.querySelector('.timmer');
const spinner = document.querySelector('.spinner');
const execName = document.querySelector('#execname');
const set = document.querySelector('.set');
const btnNext = document.querySelector('.btnNext');
const btnPrev = document.querySelector('.btnPrev');
const circle = document.querySelector('.circle');
// const Exercises = ['Seated DB Press','Lateral Raises', 'Rear Delt Fly', 'Hand Stand', 'Pike Pushup'];
const Exercises = [
    {
        ExName: 'Hand Stand',
        ExSetCount: 1,
        ExRepCount: 30,
        ExType: 0
    },
    {
        ExName: 'Seated DB Press',
        ExSetCount: 7,
        ExRepCount: 12,
        ExType: 1
    },
    {
        ExName: 'Lateral Raises',
        ExSetCount: 4,
        ExRepCount: 12,
        ExType: 1
    },
    {
        ExName: 'Rear Delt Fly',
        ExSetCount: 3,
        ExRepCount: 12,
        ExType: 1
    },
    {
        ExName: 'Pike Pushup',
        ExSetCount: 3,
        ExRepCount: 10,
        ExType: 1
    }
];

let maxTime = 11;
let curExercise = 0;
startEx(curExercise);

const interval = setInterval(() => {
    let curTime = timmer.innerHTML;
    if (curTime == 0 && Exercises[curExercise].ExType == 0) {
        curTime = maxTime + 1;
        curExercise++;
        //clearInterval(interval);
        if (Exercises[curExercise]) {
            startEx(curExercise);
        }
        else 
            return;
    }

    if (curTime <= 11)
        spinner.style.border = '2px solid #00d636';
    else 
        spinner.style.border = '2px solid #1f94ed';
    timmer.innerHTML = curTime - 1;
}, 1000);

btnNext.addEventListener('click', () => {
    // if (curExercise == Exercises.length - 1)
    //     curExercise = 0;
    // else 
    //     curExercise++;    
    if (Exercises[curExercise].ExType == 0){
        curExercise++;
        startEx(curExercise);
    } else {
        toNextSet();
    }
});

btnPrev.addEventListener('click', () => {
    if (curExercise == 0)
        curExercise = Exercises.length - 1;
    else 
        curExercise--;
    startEx(curExercise);
    
});

function countDown() {
    let curTime = timmer.innerHTML;
    if (curTime == 0) {
        curTime = maxTime + 1;
        curExercise++;
        if (Exercises[curExercise])
            execName.innerHTML = Exercises[curExercise].ExName;
        else 
            return;
    }

    if (curTime <= 11)
        spinner.style.border = '2px solid #00d636';
    else 
        spinner.style.border = '2px solid #1f94ed';
    timmer.innerHTML = curTime - 1;
}

function startEx(nextEx) {
    execName.innerHTML = Exercises[nextEx].ExName;
    if (Exercises[nextEx].ExType == 0){
        timmer.innerHTML = 30;
        circle.style.opacity = '0';
        timmer.style.opacity = '1';
        spinner.style.opacity = '1';
        //interval;
    } else {
        circle.querySelector('.setCount').innerHTML = 1;
        circle.querySelector('.repCount').innerHTML = Exercises[nextEx].ExRepCount + ' Reps';
        circle.style.background = `linear-gradient(90deg, transparent 50%, #1f94ed 50%), linear-gradient(90deg, #1f94ed 50%, transparent 50%)`;
        circle.style.opacity = '1';
        timmer.style.opacity = '0';
        spinner.style.opacity = '0';
    }
}

function toNextSet() {
    let curSet = set.querySelector('.setCount').innerHTML;
    let percent = Math.round((curSet / Exercises[curExercise].ExSetCount) * 360);
        console.log(percent);
    if (curSet < Exercises[curExercise].ExSetCount) {
        curSet++;
        if (percent <= 180){
            circle.style.background = `linear-gradient(${90 + percent}deg, transparent 50%, #1f94ed 50%), linear-gradient(90deg, #1f94ed 50%, transparent 50%)`;
        } else {
            circle.style.background = `linear-gradient(${percent - 90}deg, transparent 50%, white 50%), linear-gradient(90deg, #1f94ed 50%, transparent 50%)`;
        }
        circle.querySelector('.setCount').innerHTML = curSet;
    }
    else {
        curExercise++;
        if (!Exercises[curExercise]){
            curExercise = 0;
        }
        startEx(curExercise);
    }
}