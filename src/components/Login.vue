<template>
  <div class="container grid-lg" id="Login">
    <div class="columns">
      <div class="column col-4 col-md-12">
          <img src="img/AMU190.png" alt="AMU 190 " class="img-responsive logo"/>
      </div>
      <div class="column col-8  col-md-12 padd20p">
      <div class="column col-8 col-md-12 col-mx-auto">
        <h2>مرحبا بعودتك</h2>
        <h6> تسجيل الدخول لإدارة حسابك.</h6>
        <div class="form-group">
          <label class="form-label" for="email">البريد الإلكتروني</label>
          <input
            class="form-input"
            id="email"
            type="text"
            placeholder="البريد الإلكتروني"
            @keyup="signinrror = false "
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="password">كلمة السر</label>
          <input
            class="form-input"
            id="password"
            type="password"
            placeholder="كلمة السر"
            @keyup="signinrror = false "
            v-model="password"
          />
          <span v-show="signinrror" class="label label-warning">{{signinmsgerror}}</span>
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" />
            <i class="form-icon"></i> ذكرني
          </label>
        </div>
        <div class="form-group">
          <button @click="signin()" :class="{loading:loading}" class="btn btn-primary col-12">تسجيل الدخول</button>
          <button @click="signup()" class="btn btn-link col-mx-auto btn-center">ليس لديك حساب؟ مستخدم جديد</button>
          <button
            v-if="1==2"
            @click="resetpassword()"
            class="btn btn-link"
          >نسيت كلمة السر</button>
        </div>
      </div>
      </div>
    </div>

    <div>
      <div class="container justifyparagraph" align="center">
        <div class="columns">
          <div class="column col-12 col-lg-8 col-md-12 col-sm-12 col-mx-auto">
            <p class="label ">
              هذه التطبيقة تم إنشاؤها من قبل مجموعة من الأطباء و المهندسين التونسيين في إطار دعم الجهود الوطنية لمقاومة فيروس كورونا.
              و تهدف إلى تخفيف العبئ المسجل على خطوط 190 التابعة للإنعاش الطبي الاستعجالي و تحديد الحالات المصابة الأكثر خطورة و التي هي بحاجة ماسة لتدخل طبي عاجل و تنسيق ذلك إضافة إلى إرشاد المريض(ة) إلى أنجع الحلول من اجل متابعة حالته(ا) المرضية في حالة وجود أعراض غير خطيرة ..
              كل المعطيات المسجلة على هذه التطبيقة يتعامل معها فرق الإنعاش الطبي الاستعجالي بالمستشفيات العمومية التابعة لوزارة الصحة التونسية و يتم الاتصال بالمرضى المسجلين في الإبان مع مراعاة درجة خطورة الحالات.
              يمكن للمسجل على هذا الموقع إضافة أكثر من مريض(ة) و متابعة حالتهم(ن).
            </p>


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
        </div>
      </div>
    </div>
  </div>
</template>
  

<script>
import config from "../assets/config";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      signinrror: false,
      signinmsgerror: "",
      loading: false
    };
  },
  methods: {
    signup: function() {
      this.$router.push("signup");
    },
    signin: function() {
      let self = this;
      self.signinrror = false;
      self.signinmsgerror = "";
      self.loading = true;
      self.connexionerror = false;
      console.log(this.email);
      console.log(this.password);

      config.user.username = self.email;
      config.user.password = self.password;
      config.createToken(function(token, user, error) {
        if (error != null) {
          self.loading = false;
          self.signinrror = true;
          console.log(error.response);
          self.signinmsgerror ="كلمة المرور غير صحيحة";
          self.faillogin();
        } else {
          self.loading = false;
          self.succeslogin(token, user);
        }
      });
    },
    succeslogin: function(token, user) {
      if (token !== null) {
        localStorage.setItem("tokenid", token);
        localStorage.setItem("user", JSON.stringify(user));
        if (user.patients.length == 0) {
          this.$router.push("addpatient");
        } else {
          this.$router.push("patients");
        }
      }
    },
    faillogin: function() {
      localStorage.removeItem("tokenid");
      localStorage.removeItem("user");
    }
  }
};
</script>

<style>
.logo {
  max-width:256px;
  height:auto;
  margin-top : 40%
}
p.label {
  font-weight: 700;
  padding-top : 35px;
  padding-bottom : 35px;
  padding-right : 20px;
  padding-left : 20px;
}
.label {
 background-color: rgba(0,0,0,.0);
}
.form-checkbox .form-icon, .form-radio .form-icon {
  right : 0
}
.form-checkbox, .form-radio, .form-switch {
  padding-right : 25px
}
h2 {color : #ca3610;font-weight: 700;}
h6 {color : #ca3610}
.btn-center {text-align :center !important;margin-left:auto ;margin-right:auto;display: block;}
@media (max-width:960px){
.logo {
  margin-top : 10%;
  text-align :center !important;margin-left:auto ;margin-right:auto;display: block;
}
}
</style>