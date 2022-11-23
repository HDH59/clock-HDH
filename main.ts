function Setclock (Min: number, Sec: number) {
    DisplayTime = Min * 100 + Sec
    tm.showNumber(DisplayTime)
    if (DotBlink == 1) {
        tm.showDP(1, true)
        DotBlink = 0
    } else {
        tm.showDP(1, false)
        DotBlink = 1
    }
}
input.onButtonPressed(Button.A, function () {
    basic.showNumber(Mode)
    Timeout = 10
    if (Mode == Normal) {
        Mode = ChangeSec
    } else if (Mode == ChangeSec) {
        Mode = ChangeMin
    } else if (Mode == ChangeMin) {
        Mode = Normal
    } else {
        Mode = Normal
    }
})
input.onButtonPressed(Button.B, function () {
    Timeout = 10
    if (Mode == ChangeSec) {
        Minuten += 1
        if (Minuten >= 60) {
            Minuten = 0
        }
    } else if (Mode == ChangeMin) {
        Uren += 1
        if (Uren >= 24) {
            Uren = 0
        }
    }
})
let sec = 0
let Timeout = 0
let DisplayTime = 0
let Mode = 0
let ChangeMin = 0
let ChangeSec = 0
let Normal = 0
let Uren = 0
let Minuten = 0
let tm: TM1637.TM1637LEDs = null
let DotBlink = 0
DotBlink = 0
tm = TM1637.create(
DigitalPin.P1,
DigitalPin.P2,
0,
4
)
tm.on()
tm.showNumber(1234)
tm.showDP(1, true)
Minuten = 0
Uren = 0
Setclock(Uren, Minuten)
let Zero = 0
let Blink = 0
Normal = 1
ChangeSec = 2
ChangeMin = 3
Mode = Normal
loops.everyInterval(1000, function () {
    basic.showNumber(Mode)
    if (Timeout > 0) {
        Timeout += -1
    } else {
        Mode = Normal
    }
})
basic.forever(function () {
    if (Mode == Normal) {
        basic.pause(1000)
        Setclock(Uren, Minuten)
        sec += 1
        if (sec >= 60) {
            sec = 0
            Minuten += 1
            if (Minuten >= 60) {
                Minuten = 0
                Uren += 1
                if (Uren >= 24) {
                    Uren = 0
                }
            }
        }
    } else if (Mode == ChangeSec) {
        basic.pause(200)
        if (Blink == 0) {
            Blink = 1
            tm.clear()
        } else {
            Blink = 0
            tm.clear()
            tm.showbit(Minuten % 10, 3)
            tm.showbit(Minuten / 10, 2)
        }
    } else if (Mode == ChangeMin) {
        basic.pause(200)
        if (Blink == 0) {
            Blink = 1
            tm.clear()
        } else {
            Blink = 0
            tm.clear()
            tm.showbit(Uren % 10, 1)
            tm.showbit(Uren / 10, 0)
        }
    }
})
