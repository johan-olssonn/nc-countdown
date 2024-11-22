# NC Countdown

This is a countdown app built in Angular by Johan Olsson. It counts down the Days, Hours(h),
Minutes(m), Seconds(s) to a given date with a name that you can set yourself.

The font is dynamically scaled to always fit the screen without line breaks.

## How to run locally

Make sure Angular CLI version 17 is installed. If not, run the following command:

```
npm install -g @angular/cli@17
```

Install all dependencies:

```
npm install
```

Run the project locally:

```
ng serve
```

Navigate to http://localhost:4200/.

## Deployed web app

[https://johan-olssonn.github.io/nc-countdown/](https://johan-olssonn.github.io/nc-countdown/)

## Optional goals

A couple of things should be improved before going to production.

1. **Sync state**. The set title and date is stored in local storage to persist beteween page
   refreshes. The syncing of the state and what is actually stored in local storage could be
   improved. One of things that can be done is listening for local storage changes and update state
   accordingly. Now if you manually remove or edit the states in local storage, the UI does not read
   the information until the user refreshes.

2. **Handle the height of the font**. At some screen sizes the font can get to high and intersect
   with the subtitle because the maximum font size is only based on the width of the container.

3. **Write tests**. This project should contain tests, at least for the main logic. Two things that
   should be tested is building the countdown string from two dates and more importantly, adjusting
   the font size based on various widths.

4. **Internationalization**. The page should support different languages, right now the input labels
   and countdown string is hard coded to english.
