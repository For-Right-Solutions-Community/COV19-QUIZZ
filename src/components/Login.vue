<template>
  <div class="container" id="Login">
    <div class="columns grid-xs">
      <div class="column col-mx-auto col-4 col-xs-10 col-xl-4 col-l-5 col-md-8">
        <div align="center">
          <img
            src="img/AMU190.png"
            alt="AMU 190 "
            style="width:256px;height:256px;"
            class="img-responsive"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input
            class="form-input"
            id="email"
            type="text"
            placeholder="Email"
            @keyup="signinrror = false "
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Mot de passe</label>
          <input
            class="form-input"
            id="password"
            type="password"
            placeholder="Password"
            @keyup="signinrror = false "
            v-model="password"
          />
          <span v-show="signinrror" class="label label-warning">{{signinmsgerror}}</span>
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" />
            <i class="form-icon"></i> Se rappeler de moi
          </label>
        </div>
        <div class="form-group">
          <button @click="signin()" :class="{loading:loading}" class="btn btn-primary">Connexion</button>
          <button @click="signup()" class="btn btn-link">Créer un compte</button>
          <button
            v-if="1==2"
            @click="resetpassword()"
            class="btn btn-link"
          >J'ai oublié mon mot de passe</button>
        </div>
      </div>
    </div>

    <div>
      <div class="container justifyparagraph" align="center">
        <div class="columns">
          <div class="column col-4 col-4 col-xs-10 col-xl-4 col-l-5 col-md-8 col-mx-auto">
            <p class="label default-label">
              هذه التطبيقة تم إنشاؤها من قبل مجموعة من الأطباء و المهندسين التونسيين في إطار دعم الجهود الوطنية لمقاومة فيروس كورونا.
              و تهدف إلى تخفيف العبء المسجل على خطوط 190 التابعة للإنعاش الطبي الاستعجالي و تحديد الحالات المصابة الأكثر خطورة و التي هي بحاجة ماسة لتدخل طبي عاجل و تنسيق ذلك إضافة إلى إرشاد المريض(ة) إلى أنجع الحلول من اجل متابعة حالته(ا) المرضية في حالة وجود أعراض غير خطيرة ..
              كل المعطيات المسجلة على هذه التطبيقة يتعامل معها فرق الإنعاش الطبي الاستعجالي بالمستشفيات العمومية التابعة لوزارة الصحة التونسية و يتم الاتصال بالمرضى المسجلين في الإبان مع مراعاة درجة خطورة الحالات.
              يمكن للمسجل على هذا الموقع إضافة أكثر من مريض(ة) و متابعة حالتهم(ن).
            </p>
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
          self.signinmsgerror = "Service indisponible essayer plus tard";
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