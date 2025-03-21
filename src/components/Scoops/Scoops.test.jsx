import { findAllByRole, render, screen } from "@testing-library/react";
import Scoops from "./index";
import userEvent from "@testing-library/user-event";

/*
!Seçiciler
1) Method tipi | 2) All İfadesi  3) Seçici Method

* get > render anında DOM'da olan elementleri almak için kullanılır. | elementi bulamazsa hata döndürür.

* query > elementin ekranda olma durumu kesin değilse kullanılır.
get ile benzer çalışır. | elementi bulamazsa null döndürür test devam eder.

* find > elemntin ekrana basılma durumunun asnekron olduğu durumlarda kullanılır
(örneğin api isteği sonucu ekrana basılacaksa) 
not: find methodu promise döndürdüğü için async await ile kullanılmalı.

* eğer seçici methoda all ifadesi eklersek seçici koşula uyan 
bütün elemanları getirir.
not: all kullanılırsa dönen cevapta 1 eleman olsa dahi cevap döner

*/

test("API' den alınan veriler için kartlar ekrana basılır", async () => {
  render(<Scoops />);

  // ekrana basılan kartları al(resimleri almak yeterli)
  const images = await screen.findAllByAltText("çeşit-resim");

  // ekrandaki resimlerin sayısı 1 den fazla mı
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Çeşitlerin ekleme veya azaltma işlevlerinin toplam fiyata etkisi", async () => {
  // userEvent'in kurulumunu yap
  const user = userEvent.setup();

  // test edilecek bileşen render edilir.
  render(<Scoops />);

  // bütün ekleme ve azaltma butonlarını çağır.
  const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
  const delBtns = await screen.findAllByRole("button", { name: "Azalt" });

  // toplam fiyat elementini çağır
  const total = screen.getByTestId("total");

  // başlangıç anında toplam 0 mı kontrol et
  expect(total).toHaveTextContent(/^0$/);

  // cohocolate'ın ekle butonuna tıkla
  await user.click(addBtns[2]);

  // toplam fiyat 20 mi kontrol et
  expect(total).toHaveTextContent(/^20$/);

  // vanilla' nın ekle butonuna çift tıkla
  await user.dblClick(addBtns[1]);

  // toplam fiyat 60 mı kontrol et
  expect(total).toHaveTextContent(/^60$/);

  // vanillanın azalt butonuna bir kez tıkla
  await user.click(delBtns[1]);

  // toplam fiyat 40 mı kontrol et
  expect(total).toHaveTextContent(/^40$/);

  // vanillanın azalt butonuna bir kez tıkla
  await user.click(delBtns[1]);

  // toplam fiyat 20 mı kontrol et
  expect(total).toHaveTextContent(/^20$/);

  // cohocolate'ın azalt butonuna tıkla
  await user.click(delBtns[2]);

  // toplam fiyat 0 mı kontrol et.
  expect(total).toHaveTextContent(/^0$/);
});
