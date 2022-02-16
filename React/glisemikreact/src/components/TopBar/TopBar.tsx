import axios from "axios";
import React, { useState, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Segment,
  Modal,
  Button,
  Checkbox,
  Form,
  Label,
  Icon,
} from "semantic-ui-react";
import { cities } from "../../data/Datas";
import { logout } from "../../services/Services";
import { toast } from "react-toastify";
import { userAndAdminLogin } from "../../services/Services";
import { IUser, UserResult } from "../../models/IUser";
import { control, encryptData } from "../../utils/Util";

const TopBar = (props) => {
  const [activeItem, setActiveitem] = useState("home"); //Default NavBar page
  const [open, setOpen] = React.useState(false); //Login Modal Control
  const [open2, setOpen2] = React.useState(false); //Register Modal Control
  const [usermail, setUserMail] = useState(""); //DATA
  const [password, setPassword] = useState(""); //DATA
  const [form, setForm] = useState({
    name: "",
    surname: "",
    cityid: "",
    mobile: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [user, setUser] = useState<UserResult | null>();
  // logout
  const [isLogOut, setIsLogOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // modal delete state
  const [modalStatus, setModalStatus] = useState(false);
  const [modalLoginStatus, setModalLoginStatus] = useState(false);

  //Login Status refresh
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    const usr = control();
    if (usr !== null) {
      setUser(usr);
      usr.roles!.forEach((item) => {
        if (item.name === "admin") {
          setIsAdmin(true);
        }
      });
    }
  }, [loginStatus]);
  //
  //Login works
  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (usermail === "") {
      toast.warning("Lütfen email alanını doldurunuz!");
    } else if (password === "") {
      toast.warning("Lütfen şifre alanını doldurunuz!");
    } else {
      toast.loading("Yükleniyor.");
      userAndAdminLogin(usermail, password)
        .then((res) => {
          const usr: IUser = res.data;
          if (usr.status!) {
            const userResult = usr.result!;
            // key
            const key = process.env.REACT_APP_SALT;
            const cryptString = encryptData(userResult, key!);
            const userAutString = encryptData(res.config.headers, key!);
            localStorage.setItem("user", cryptString);
            localStorage.setItem("aut", userAutString);
            setLoginStatus(usr.status!);
          }
          toast.dismiss();
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Bu yetkilerde bir kullanıcı yok!");
        });
    }
  };
  // log out fnc
  const fncLogOut = () => {
    toast.loading("Yükleniyor.");
    logout()
      .then((res) => {
        localStorage.removeItem("user");
        setIsLogOut(false);
        setUser(null);
        setLoginStatus(false);
        setIsAdmin(false);
        toast.dismiss();
        window.location.href = "/";
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Çıkış işlemi sırasında bir hata oluştu!");
      });
  };

  //

  //
  //Register works
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();

    const { name, surname, cityid, mobile, email, password } = form;

    const body = {
      name,
      surname,
      cityid,
      mobile,
      email,
      password,
      enabled: true,
      toxenExpired: true,

      roles: [{ rid: 0, name: "ROLE_admin" }],
    };
    axios.post("http://localhost:8080/register/adminRegister", body);
  };

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = "Şifre Eşleşmiyor";
  }

  //
  //Register & Login Button Control
  const buttonEnabledLogin = usermail && password;
  const buttonEnabledRegister =
    form.name &&
    form.surname &&
    form.cityid &&
    form.mobile &&
    form.email &&
    form.password;

  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => {
            setActiveitem("home");
          }}
        >
          <Link className="navbar-brand" to="/">
            Ana Sayfa
          </Link>
        </Menu.Item>

        {isAdmin && (
          <Menu.Item
            name="Bekleyenler"
            active={activeItem === "adminpage"}
            onClick={() => {
              setActiveitem("adminpage");
            }}
          >
            <Link className="navbar-brand" to="/adminpage">
              Bekleyenler
            </Link>
          </Menu.Item>
        )}
        {user && (
          <>
            <Menu.Item
              name="kayıt"
              active={activeItem === "kayıt"}
              onClick={() => {
                setActiveitem("kayıt");
              }}
            >
              {" "}
              <Link className="navbar-brand" to="/newfood">
                Ürün Kayıt
              </Link>
            </Menu.Item>
            <Menu.Item
              name="about"
              active={activeItem === "myfood"}
              onClick={() => {
                setActiveitem("myfood");
              }}
            >
              <Link className="navbar-brand" to="/myfood">
                Eklediklerim
              </Link>
            </Menu.Item>
          </>
        )}
        {user && (
          <>
            <Menu.Item>
              <Label size="large" color="grey">
                <Icon color="green" name="user" /> {user.name} {user.surname}
              </Label>
            </Menu.Item>

            <Menu.Item
              position="right"
              name="Çıkış Yap"
              active={activeItem === "Çıkış Yap"}
              onClick={(e, data) => setIsLogOut(true)}
            />
          </>
        )}
        {!user && (
          <>
            <Menu.Item position="right">
              <Modal
                size="small"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{ opacity: 0.91 }}
                trigger={
                  <Link className="navbar-brand" to="#">
                    Giriş Yap<hr></hr>
                  </Link>
                }
              >
                <Modal.Header>Giriş Yap</Modal.Header>
                <Modal.Content>
                  <Form
                    onSubmit={(e) => {
                      login(e);
                    }}
                  >
                    <Form.Group widths="equal">
                      <Form.Input
                        required
                        value={usermail}
                        onChange={(e, d) => setUserMail(d.value)}
                        type="mail"
                        icon="mail"
                        iconPosition="left"
                        fluid
                        placeholder="Email"
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Input
                        value={password}
                        onChange={(e, d) => setPassword(d.value)}
                        type="password"
                        icon="key"
                        iconPosition="left"
                        fluid
                        placeholder="Şifre"
                      />
                    </Form.Group>
                    <Form.Field>
                      <Checkbox label="Beni Hatırla" />
                    </Form.Field>
                    <Button
                      color="green"
                      disabled={!buttonEnabledLogin}
                      type="submit"
                    >
                      Giriş Yap
                    </Button>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Kapat
                  </Button>
                </Modal.Actions>
              </Modal>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Modal
                onClose={() => setOpen2(false)}
                onOpen={() => setOpen2(true)}
                open={open2}
                style={{ opacity: 0.91 }}
                trigger={
                  <Link className="navbar-brand" to="#">
                    Kayıt Ol <hr></hr>
                  </Link>
                }
              >
                <Modal.Header>Kayıt Ol</Modal.Header>
                <Modal.Content>
                  <Form
                    onSubmit={(e) => {
                      handleRegister(e);
                    }}
                  >
                    <Form.Field width="7">
                      <label>Kullanıcı Mail </label>
                      <input
                        type="text"
                        placeholder="E-mail"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                        }}
                      />
                    </Form.Field>
                    <Form.Field width="7">
                      <label>Kullanıcı İsmi </label>
                      <input
                        type="text"
                        placeholder="E-mail"
                        value={form.name}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Form.Field>
                    <Form.Field width="7">
                      <label>Kullanıcı Soyismi </label>
                      <input
                        type="text"
                        placeholder="E-mail"
                        value={form.surname}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            surname: e.target.value,
                          });
                        }}
                      />
                    </Form.Field>
                    <Form.Field width="7">
                      <label> Şehir Kodu </label>
                      <input
                        type="text"
                        placeholder="E-mail"
                        value={form.cityid}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            cityid: e.target.value,
                          });
                        }}
                      />
                    </Form.Field>
                    <Form.Field width="7">
                      <label> Telefon Numarası </label>
                      <input
                        type="text"
                        placeholder="E-mail"
                        value={form.mobile}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            mobile: e.target.value,
                          });
                        }}
                      />
                    </Form.Field>
                    <Form.Field width="7">
                      <label> Şifre </label>
                      <input
                        type="text"
                        placeholder="E-mail"
                        value={form.password}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            password: e.target.value,
                          });
                        }}
                      />
                    </Form.Field>
                    <Form.Field width="7">
                      <label>Şifre Tekrar</label>
                      <input
                        type="password"
                        placeholder="Şifre"
                        value={form.passwordRepeat}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            passwordRepeat: e.target.value,
                          });
                        }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Checkbox label="Sözleşmeyi Onaylıyorum" />
                    </Form.Field>
                    <Button
                      color="green"
                      disabled={!buttonEnabledRegister}
                      type="submit"
                    >
                      Kayıt Ol
                    </Button>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen2(false)}>
                    Kapat
                  </Button>
                </Modal.Actions>
              </Modal>
            </Menu.Item>
          </>
        )}
        <Modal size="mini" open={isLogOut} onClose={() => setIsLogOut(false)}>
          <Modal.Header>Çıkış İşlemi</Modal.Header>
          <Modal.Content>
            <p>Çıkmak istediğinizden emin misniz?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setIsLogOut(false)}>
              İptal
            </Button>
            <Button positive onClick={() => fncLogOut()}>
              Çıkış Yap
            </Button>
          </Modal.Actions>
        </Modal>
      </Menu>
    </Segment>
  );
};

export default TopBar;
