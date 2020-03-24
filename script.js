var quiz = {
  user: "Dave",
  questions: [
  {
    text: "Q1 :Pensez-vous avoir ou avoir eu de la fièvre ces derniers jours (frissons, sueurs) ?",
    responses: [
    { text: "Oui" , correct: true },
   
    { text: "Non" }] },


  {
    text: "Q2 :Quelle est votre température corporelle ?",
    responses: [
    { text: "37,0degrés", correct: true },
    { text: "WEB" },
    { text: "HEAD" },
    { text: "BODY" }] },


  {
    text: "Q3 :Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?",
    responses: [
    { text: "Oui" , correct: true },
    { text: "NON"}] },


  {
    text: "Q4 :Ces derniers jours, avez-vous noté une forte diminution ou perte de votre goût ou de votre odorat ?",
    responses: [
    { text: "OUI", correct: true },
    { text: "NON" } ]},


  {
    text: "Q5 :Ces derniers jours, avez-vous un mal de gorge ?",
    responses: [
    { text: "OUI " },
    

    { text: "NON", correct: true }
	] },


  {
    text:
    "Q6 :Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles.",
    responses: [
   
    { text: "OUI", correct: true },
    { text: "NON" }] },


  {
    text: "Q7 : Ces derniers jours, avez-vous une fatigue inhabituelle ? ",
    responses: [
    { text: " OUI", correct: true },
  

    { text: "NON" }] },


  {
    text: "Q8 :Cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ? ",
    responses: [
    { text: "OUI", correct: true },
    { text: "NON" }] },


  {
    text:
    "Q9 :Êtes vous dans l'impossibilité de vous alimenter ou de boire DEPUIS 24 HEURES OU PLUS ?",
    responses: [
 
    { text: "OUI", correct: true },
    { text: "NON" }] },

   {
    text: 
    "Q 10 :Dans les dernières 24 heures, avez-vous noté un manque de souffle INHABITUEL lorsque vous parlez ou faites un petit effort ?",
    responses: [
 
    { text: "OUI", correct: true },
    { text: "NON" }] },
	
	{
    text:
    "Q11 :Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique.",
    responses: [
 
    { text: "24", correct: true },
    { text: "25" }] },
	
	{
    text:
    "Q12 :Quel est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.",
    responses: [
 
    { text: "170", correct: true },
    { text: "180" }] },
	
	{
    text:
    "Q13 :Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.",
    responses: [
 
    { text: "50 KG", correct: true },
    { text: "60 KG" }] },
	
	{
    text:
    "Q14 :Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez vous un traitement à visée cardiologique ?",
    responses: [
 
    { text: "OUI", correct: true },
    { text: "NON" },
	{ text: "Ne sait pas" }] },
	
	{
    text:
    "Q15 :Êtes-vous diabétique ?",
    responses: [
 
    { text: "OUI", correct: true },
    { text: "NON" }] },
	
	{
    text:
    "Q16 :Avez-vous ou avez-vous eu un cancer ?",
    responses: [
 
    { text: "OUI", correct: true },
    { text: "NON" }] },
	
	{
    text:
    "Q17 :Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?",
    responses: [
 
    { text: "OUI", correct: true },
    { text: "NON" }] },
	
	{
    text:
    "Q18 :Avez-vous une insuffisance rénale chronique dialysée ?",
    responses: [
 
    { text: "OUI", correct: true },
    { text: "NON" }] },
	
	{
    text:
    "Q19 :Avez-vous une maladie chronique du foie ?",
    responses: [
 
    { text: "OUI", correct: true },
    { text: "NON" }] },
	
	
	{
    text:
    "Q20 :Êtes-vous enceinte ?",
    responses: [
 
    { text: "OUI", correct: true },
	{ text: "NON" },
    { text: "NON applicable" }] },
	
	{
    text:
    "Q21 :Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?",
    responses: [
 
    { text: "OUI", correct: true },
	{ text: "NON" },
	
    { text: "Ne sait pas" }] },
	
	
	{
    text:
    "Q22 :Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).?",
    responses: [
 
    { text: "OUI", correct: true },
	{ text: "NON" },
	
    { text: "Ne sait pas" }] },
	
   
   
  {
    text: "Q23 :Quel est votre code postal ? Cette information nous permet de réaliser un suivi épidémiologique",
    responses: [
    { text: "Browsers " },
    { text: "Search Engines", correct: true },
    { text: "News Group" },
    { text: "None of the above" }] }] },




userResponseSkelaton = Array(quiz.questions.length).fill(null);

var app = new Vue({
  el: "#app",
  data: {
    quiz: quiz,
    questionIndex: 0,
    userResponses: userResponseSkelaton,
    isActive: false },

  filters: {
    charIndex: function (i) {
      return String.fromCharCode(97 + i);
    } },

  methods: {
    restart: function () {
      this.questionIndex = 0;
      this.userResponses = Array(this.quiz.questions.length).fill(null);
    },
    selectOption: function (index) {
      Vue.set(this.userResponses, this.questionIndex, index);
      //console.log(this.userResponses);
    },
    next: function () {
      if (this.questionIndex < this.quiz.questions.length)
      this.questionIndex++;
    },

    prev: function () {
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },
    // Return "true" count in userResponses
    score: function () {
      var score = 0;
      for (let i = 0; i < this.userResponses.length; i++) {
        if (
        typeof this.quiz.questions[i].responses[
        this.userResponses[i]] !==
        "undefined" &&
        this.quiz.questions[i].responses[this.userResponses[i]].correct)
        {
          score = score + 1;
        }
      }
      return score;

      //return this.userResponses.filter(function(val) { return val }).length;
    } } });