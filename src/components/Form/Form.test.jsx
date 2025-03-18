import Form from ".";
import {
  fireEvent,
  getByRole,
  getByText,
  render,
  screen,
} from "@testing-library/react";

test("Koşulların onay durumuna göre buton aktifliği", () => {
  // 1) test edilecek bileşen render edilir.
  render(<Form />);

  // 2) gerekli elementleri çağır.(button | checkbox)
  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  // 3) checkbox tiklenmemiştir.
  expect(checkbox).not.toBeChecked();

  // 4) buton inaktiftir
  expect(button).toBeDisabled();

  // 5) checkbox'ı tikle
  fireEvent.click(checkbox);

  // 6) buton aktif mi kontrol et
  expect(button).toBeEnabled();

  // 7) checkbox'tan tiki kaldır
  fireEvent.click(checkbox);

  // 8) buton inaktif mi kontrol et
  expect(button).toBeDisabled();
});

test("Butonun hover durumuna göre bildirim ekrana gelir", () => {
  render(<Form />);

  // gerekli elementleri al
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const alert = screen.getByText(/teslim etmeyeceğiz/i);

  // bildirim ekranda gözükmüyordur.
  expect(alert).not.toBeVisible();

  // checkboxı tikle
  fireEvent.click(checkbox);

  // mouse'u butonun üzerine getir (hover)
  fireEvent.mouseEnter(button);

  // ekranda bildirim var mı kontrolü yapalım.
  expect(alert).toBeVisible();

  // mouse' u butondan çek
  fireEvent.mouseLeave(button);

  // bildirim ekranda gözükmüyordur.
  expect(alert).not.toBeVisible();

});
