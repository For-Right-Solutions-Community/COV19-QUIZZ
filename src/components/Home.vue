<template>
   <div class="container grid-lg" >

    <HeaderNavigation />
    <div class="topspace" align="center">
     
      <h5>
     <div>
      <div class="container  justifyparagraph  " align="center"  >
        <div class="columns">
          <div class="column col-12  col-xs-10 col-xl-4 col-l-5 col-md-8 col-mx-auto"> 
                 <p class="label default-label" >
تحتوي هذه التطبيقة على جملة من الأسئلة حول أعراض المريض(ة) والأمراض المزمنة التي يعاني/تعاني منها و يرجو الإجابة عنها بدقة.
كل المعطيات المسجلة على هذه التطبيقة يتم التعاطي معها من قبل فرق الانعاش الطبي الاستعجالي بتونس.من اجل تنسيق اكبر للجهود في اطار مقاومة فيروس كورونا ، اضافة الى كونها مهمة في تطوير البحث العلمي و متابعة الوضع الوبائي جهويا و وطنيا و فهم ادق لمناطق انتشار الوباء.
هذه المعطيات الشخصية محمية برمجيا و بموجب السر المهني للاطباء و العاملين في المجال الصحي
الجهة الوحيدة المخولة للتعامل مع هذه المعطيات هي وزارة الصحة و كليات الطب و الهياكل التابعة لها في اطار جهود مقاومة وباء كورونا و البحوث العلمية المزمع القيام بها في هذا الاطار 

          </p>
      </div>
        </div>
      </div>


    </div>
      </h5>

    </div>

   <div>
    <h1>المساهمون :</h1>
   </div>
    <div   class="card  topspace"  >
      <div class="card-header">
        <div class="card-title h2">كلية الطب بصفاقس</div>
      </div>
      <div class="card-image">
      <img src="img/fmsf.png" alt="AMU 190 " style="width:200px;height:180px;" class="img-responsive leftspace " />
      </div>
    </div>
    <div   class="card  topspace"  >
      <div class="card-header">
        <div class="card-title h2">هيئة الأمم المتحدة للمرأة</div>
      </div>
      <div class="card-image">
      <img src="img/UN_Women_Arabic_No_Tag_Blue.png" alt="AMU 190 " style="width:200px;height:180px;" class="img-responsive leftspace" />
      </div>
    </div>
    <div   class="card  topspace"  >
      <div class="card-header">
        <div class="card-title h2">خدمة الإستعجالي الطبي بصفاقس</div>
      </div>
      <div class="card-image">
         <img src="img/samu.png" alt="AMU 190 " style="width:200px;height:180px;" class="img-responsive leftspace " />
      </div>
    </div>

    <div   class="card  topspace"  >
      <div class="card-header">
        <div class="card-title h2"> المبادرة الشعبية للتصدي لوباء كورونا </div>
      </div>
      <div class="card-image">
         <img src="img/moubedra.jpg" alt="AMU 190 " style="width:200px;height:180px;" class="img-responsive leftspace " />
      </div>
    </div>

     <div   class="card  topspace"  >
       <div class="card-header">
        <div class="card-title h2">شركة الحلول الصحيحة</div>
      </div>
      <div class="card-image">
       <img src="img/FRS.jpg" alt="AMU 190 " style="width:200px;height:180px;" class="img-responsive leftspace " />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNavigation from "./HeaderNavigation";
export default {

  components: {
    HeaderNavigation
  }
};
</script>

<style>
body {background : #F6F6F6}
</style>