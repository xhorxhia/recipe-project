package recipes.domain;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
public class AuthResponse<T> {
    @NonNull
    public T entity;
    public boolean errorFlag = false;
    public String reasoning = "";
}
