package com.example.backend.service;

import com.example.backend.model.Cart;
import com.example.backend.model.Product;
import com.example.backend.model.QuantityProduct;
import com.example.backend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CartServiceTest {
    private final String apiPath = "/api/cart";
    @MockBean
    private CartService mockCartService;
    @Autowired
    private MockMvc mockMvc;
    private User client;
    private Cart c;

    @BeforeEach
    void setUp() {
        client = new User();
        c = new Cart();
        Product p = Product.builder()
                        .name("Szampon")
                        .price(10.0).build();
        c.getProducts().add(new QuantityProduct(p, 5));
        client.setCart(c);
    }
    @Test
    void getCart() throws Exception {
        when(mockCartService.getCart()).thenReturn(c);
        mockMvc.perform(get(apiPath).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.products[0].name").value("Szampon"));
    }
    @Test
    void addProduct() {
    }

    @Test
    void deleteProduct() {
    }

    @Test
    void setProductQuantity() {
    }

    @Test
    void clearCart() {
    }
}